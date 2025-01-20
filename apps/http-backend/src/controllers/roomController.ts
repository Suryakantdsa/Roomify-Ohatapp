import { Request, Response } from "express";
import { createRoomSchema, joinRoomSchema } from "@repo/zod/src/RoomSchema";
import { fromError } from "@repo/zod/node_modules/zod-validation-error";
import { prismaClient } from "@repo/db/client";

const createRoom = async (req: Request, res: Response) => {
  try {
    const parsedData = createRoomSchema.safeParse(req.body);
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        message: "invalid accessToken",
      });
    }
    if (!parsedData.success) {
      const validationError = fromError(parsedData.error);
      res.status(422).json(validationError.toString);
      return;
    }

    const roomDetails = await prismaClient.room.create({
      data: {
        name: parsedData.data.name,
        isGroup: parsedData.data.isGroup,
        participants: {
          connect: [{ id: userId }],
        },
      },
    });
    res.status(201).json(roomDetails);
  } catch (error: any) {
    res.status(500).json("Internal server error " + error.message);
  }
};
const joinRoom = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const { roomId } = req.params;
    if (isNaN(Number(roomId))) {
      res.status(400).json({
        message: "invalid roomid",
      });
      return;
    }
    if (!userId) {
      res.status(401).json({
        message: "invalid accessToken",
      });
      return;
    }

    const checkRoom = await prismaClient.room.findUnique({
      where: {
        id: Number(roomId),
      },
      select: {
        id: true,
        participants: { select: { id: true, name: true } },
        isGroup: true,
      },
    });

    if (!checkRoom) {
      res.status(400).json({
        message: "Room  not  found ",
      });
      return;
    }
    // if (checkRoom.isGroup) {
    //   res.status(400).json({
    //     message: "Not a room",
    //   });
    //   return;
    // }
    // console.log();
    if (checkRoom?.participants.map((d) => d.id).includes(userId)) {
      res.status(400).json({
        message: "Already joined the room",
        // checkRoom,
      });
      return;
    }
    const joinedRoom = await prismaClient.room.update({
      where: {
        id: Number(roomId),
      },
      data: {
        participants: {
          connect: [{ id: userId }],
        },
      },
      include: {
        participants: {
          omit: {
            password: true,
          },
        },
      },
    });
    res.status(201).json({
      message: "Joined sucessfully",
      data: joinedRoom,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { createRoom, joinRoom };
