import { Request, Response } from "express";
import { createRoomSchema } from "@repo/zod/src/RoomSchema";
import { fromError } from "@repo/zod/node_modules/zod-validation-error";
import { prismaClient } from "@repo/db/client";

const createRoom = async (req: Request, res: Response) => {
  try {
    const parsedData = createRoomSchema.safeParse(req.body);

    if (!parsedData.success) {
      const validationError = fromError(parsedData.error);
      res.status(422).json(validationError.toString);
      return;
    }

    const roomDetails = await prismaClient.room.create({
      data: {
        name: parsedData.data.name,
        isGroup: parsedData.data.isGroup,
      },
    });
    res.status(201).json(roomDetails);
  } catch (error: any) {
    res.status(500).json("Internal server error " + error.message);
  }
};
