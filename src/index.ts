import { PrismaClient } from "@prisma/client";
import express from "express";
import jwt from "jsonwebtoken";
import { CreateUserSchema, SigninSchema } from "./Zodvalidator/types";
import { middleware } from "./middleware/middleware";
const { chat, user, room, message } = new PrismaClient();

const app = express();

const JWT_SECRET = process.env.JWT_SECRET || "skjd";
const PORT = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  res.json({ message: "working fine" });
});

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  // db call

  const userdetails = await user.create({
    data: {
      email: parsedData.data?.username,
      password: parsedData.data?.password,
    },
  });

  res.json({
    user: userdetails.id,
  });
});

app.post("/signin", async (req, res) => {
  const data = SigninSchema.safeParse(req.body);
  if (!data.success) {
    res.json({ message: "Incorrect inputs" });
    return;
  }

  const userDetails = await user.findUnique({
    where: { email: data.data.username },
  });

  if (!userDetails) {
    res.status(401).json({ message: "User not found" });
    return;
  }

  const isValidPassword = await bcrypt.compare(
    data.data.password,
    userDetails.password
  );

  if (!isValidPassword) {
    res.status(401).json({ message: "Invalid password" });
    return;
  }

  const token = jwt.sign({ userId: userDetails.id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

app.post("/v1/create-room", middleware, async (req, res) => {});
app.get("/v1/get-room-details/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const roomDetails = await room.findUnique({ where: { id: parseInt(id) } });

    if (!roomDetails) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    res.status(200).json(roomDetails);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/message", middleware, async (req, res) => {
  const messages = await message.findMany({
    where: {
      chatId: chat_id,
      OR: [{ senderId: req.user }, { receiverId: recever.id }],
    },
    orderBy: {
      createdAt: "asc",
    },
  });
});
app.get("/chats", middleware, async (req, res) => {
  const allChats = await chat.findMany({
    where: {
      sender: req.user,
    },
    include: {
      receiver: true,
    },
  });
});

app.listen(PORT, () => {
  console.log(`app running on http://localhost:${PORT}`);
});
