import z from "zod";

export const createMessageSchema = z.object({
  content: z.string().min(1, "message is blank").max(1000),
  senderId: z.number(),
  roomId: z.number(),
  isRead: z.boolean(),
});

export type Message_POST = z.infer<typeof createMessageSchema>;
