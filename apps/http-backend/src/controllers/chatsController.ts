import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";
import { createMessageSchema } from "@repo/zod/src/MessageSchema";
import { fromError } from "@repo/zod/node_modules/zod-validation-error";

const getChats = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized. Please log in." });
      return;
    }

    const chats = await prismaClient.room.findMany({
      where: {
        participants: {
          some: { id: userId },
        },
      },
      include: {
        messages: {
          where: { NOT: { id: userId } },
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },

        participants: {
          where: { NOT: { id: userId } },
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    // console.log(chats);

    const response = chats.map((chat) => {
      const lastMessage = chat.messages[0]?.content || "No messages yet";
      const lastTime = chat.messages[0]?.createdAt || null;

      if (chat.isGroup) {
        return {
          id: chat.id,
          name: chat.name || "Group Chat",
          avatar: "/group-default.jpeg",
          isGroup: chat.isGroup,
          lastMessage,
          lastTime,
        };
      } else {
        const participant = chat.participants[0];
        return {
          id: chat.id,
          reciverId: participant?.id,
          reciverName: participant?.name,
          isGroup: chat.isGroup,
          name: participant?.name || "Unknown User",
          avatar: participant?.avatar || "/default.jpeg",
          lastMessage,
          lastTime,
        };
      }
    });

    res.status(200).json(response);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const getChatMessages = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { roomId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;

    if (!roomId) {
      res.status(400).json({
        message: "roomId is required",
      });
      return;
    }

    const totalMessages = await prismaClient.message.count({
      where: {
        roomId: parseInt(roomId as string),
      },
    });

    const messages = await prismaClient.message.findMany({
      where: {
        roomId: parseInt(roomId as string),
      },
      orderBy: {
        createdAt: "asc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
        // : { select: { id: true, name: true, avatar: true } },
      },
    });
    const roomDetails = await prismaClient.room.findUnique({
      where: {
        id: parseInt(roomId as string),
      },
    });

    await prismaClient.message.updateMany({
      where: {
        roomId: parseInt(roomId as string),
        isRead: false,
        NOT: { senderId: userId },
      },
      data: {
        isRead: true,
      },
    });

    res.status(200).json(
      // total: totalMessages,
      // skip: (page - 1) * pageSize,
      // limit: pageSize,
      // currentPage: page,
      // totalPages: Math.ceil(totalMessages / pageSize),
      // data: { messages: messages, room: roomDetails },
      { messages: messages, room: roomDetails }
    );
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error: " + error.message,
    });
  }
};

const sendMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized. Please log in." });
      return;
    }

    const parsedData = createMessageSchema.safeParse(req.body);
    if (!parsedData.success) {
      const validationError = fromError(parsedData.error);
      res.status(400).json({
        message: "Validation error",
        details: validationError.toString(),
      });
      return;
    }

    const { roomId, content, reciverId } = parsedData.data;
    let roomDetails;
    if (!roomId && reciverId) {
      roomDetails = await prismaClient.room.create({
        data: {
          participants: {
            connect: [{ id: reciverId }, { id: userId }],
          },
        },
        select: {
          id: true,
          participants: { select: { id: true } },
          isGroup: true,
        },
      });
    } else {
      roomDetails = await prismaClient.room.findFirst({
        where: {
          id: roomId,
        },
        select: {
          id: true,
          participants: { select: { id: true } },
          isGroup: true,
        },
      });
    }
    if (!roomDetails) {
      res.status(404).json({
        message: "Room not found",
      });
      return;
    }

    const participantIds = roomDetails.participants.map((p) => p.id);
    console.log(participantIds);
    if (!participantIds.includes(userId)) {
      res.status(400).json({
        message: "cann't send",
      });
      return;
    }

    if (roomDetails.isGroup && !participantIds.includes(userId)) {
      res.status(400).json({
        message: "You are not authorized to send messages to this room.",
      });
      return;
    }
    if (reciverId && !participantIds.includes(reciverId)) {
      if (!roomDetails?.isGroup) {
        await prismaClient.room.update({
          where: {
            id: roomId,
          },
          data: {
            participants: {
              connect: [{ id: userId }, { id: reciverId }],
            },
          },
        });
      }
    }

    const sentMessage = await prismaClient.message.create({
      data: {
        senderId: userId,
        roomId: roomDetails.id,
        content,
      },
    });

    res.status(201).json({
      message: "Message sent successfully.",
      data: sentMessage,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error: " + error.message,
    });
  }
};

export { getChats, getChatMessages, sendMessage };
