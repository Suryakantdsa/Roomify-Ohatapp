import { PrismaClient } from "@prisma/client";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CreateUserSchema, SigninSchema } from "./Zodvalidator/User";
import { middleware } from "./middleware/middleware";
import { Room_POST, RoomPOST } from "./Zodvalidator/Room";
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
  const hashedPassword = await bcrypt.hash(parsedData.data?.password, 10);
  const userdetails = await user.create({
    data: {
      email: parsedData.data?.username,
      password: hashedPassword,
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

app.post("/v1/create-room", middleware, async (req, res) => {
  const parseResult = Room_POST.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const { slug } = parseResult.data;

  try {
    // Example database operation using the slug
    const newRoom = await room.create({
      data: {
        slug,
        adminId: req.userId as string,
      },
    });

    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: "Failed to create room" });
  }
});

app.listen(PORT, () => {
  console.log(`app running on http://localhost:${PORT}`);
});
