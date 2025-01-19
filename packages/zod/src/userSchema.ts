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
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
  avatar: z.string(),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignUp_POST = z.infer<typeof signupUserSchema>;
export type LogIn_POst = z.infer<typeof loginUserSchema>;
