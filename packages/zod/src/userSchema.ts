// // Schema for WhatsApp-like chat application
// model User {
//     id        Int      @id @default(autoincrement())
//     email     String   @unique
//     name      String
//     password  String
//     avatar    String?
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     // Relations
//     rooms            RoomParticipant[]
//     sentMessages     Message[]         @relation("SentMessages")
//     receivedMessages Message[]         @relation("ReceivedMessages")
//     groupsOwned      Room[]            @relation("RoomOwner")
//   }

import { z } from "zod";

export const signupUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  avatar: z.string().optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignUp_POST = z.infer<typeof signupUserSchema>;
export type LogIn_POST = z.infer<typeof loginUserSchema>;
