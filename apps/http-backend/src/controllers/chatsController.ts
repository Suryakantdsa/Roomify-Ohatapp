import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";
import { createMessageSchema } from "@repo/zod/src/MessageSchema";
import { fromError } from "@repo/zod/node_modules/zod-validation-error";

// const getChats = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user?.id;
//     const chats = await prismaClient.room.findMany({
//       where: {
//         participants: {
//           some: { id: userId },
//         },
//       },
//       include: {
//         messages: {
//           take: 1,
//           orderBy: {
//             createdAt: "desc",
//           },
//         },
//         participants: {
//           where: { NOT: { id: userId } },
//           select: {
//             id: true,
//             name: true,
//             avatar: true,
//           },
//         },
//       },
//     });
//     chats.map((chat) => {
//       if (chat.isGroup) {
//         res.status(201).json({
//           id: chat.id,
//           name: chat.name,
//           avatar: chat.avatar || "/default.jpeg",
//           lastMessage: chat.message[0]?.content || "no message yet",
//           lastTime: chat.message[0]?.createdAt || null,
//         });
//       } else {
//         res.status(201).json({
//           id: chat.id,
//           name: chat.participants[0]?.name || "Unknown user",
//           avatar: chat.participants[0]?.avatar || "/default.jpeg",
//           lastMessage: chat.message[0]?.content || "no message yet",
//           lastTime: chat.message[0]?.createdAt || null,
//         });
//       }
//     });
//   } catch (error: any) {
//     res
//       .status(500)
//       .json({ message: "internal server error: " + error.message });
//   }
// };

const getChats = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const chats = await prismaClient.room.findMany({
      where: {
        participants: {
          some: { id: userId },
        },
      },
      include: {
        messages: {
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

    const response = chats.map((chat) => {
      const lastMessage = chat.messages[0]?.content || "No messages yet";
      const lastTime = chat.messages[0]?.createdAt || null;

      if (chat.isGroup) {
        return {
          id: chat.id,
          name: chat.name || "Group Chat",
          avatar: chat.avatar || "/default.jpeg",
          lastMessage,
          lastTime,
        };
      } else {
        const participant = chat.participants[0];
        return {
          id: chat.id,
          name: participant?.name || "Unknown User",
          avatar: participant?.avatar || "/default.jpeg",
          lastMessage,
          lastTime,
        };
      }
    });

    return res.status(200).json(response);
  } catch (error: any) {
    return res
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
      return res.status(400).json({
        message: "roomId is required",
      });
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
        receiver: { select: { id: true, name: true, avatar: true } },
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

    return res.status(200).json({
      total: totalMessages,
      skip: (page - 1) * pageSize,
      limit: pageSize,
      currentPage: page,
      totalPages: Math.ceil(totalMessages / pageSize),
      data: messages,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error: " + error.message,
    });
  }
};
const sendMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const parsedData = createMessageSchema.safeParse(req.body);
    if (!parsedData.success) {
      const validationError = fromError(parsedData.error);
      return res.status(400).json({
        message: "Validation error",
        details: validationError.toString(),
      });
    }

    const { roomId, content } = parsedData.data;

    const isParticipant = await prismaClient.room.findFirst({
      where: {
        id: roomId,
        participants: {
          some: { id: userId },
        },
      },
    });

    if (!isParticipant) {
      return res.status(403).json({
        message: "You are not authorized to send messages to this room.",
      });
    }

    const sentMessage = await prismaClient.message.create({
      data: {
        senderId: userId,
        roomId,
        content,
      },
    });

    return res.status(201).json({
      message: "Message sent successfully.",
      data: sentMessage,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Internal server error: " + error.message,
    });
  }
};

export { getChats, getChatMessages, sendMessage };
