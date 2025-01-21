import z from "zod";

export const createMessageSchema = z.object({
  content: z.string().min(1, "message is blank").max(1000),
  roomId: z.number().optional(),
  reciverId: z.number().optional(),
  isRead: z.boolean().default(false),
});

export type Message_POST = z.infer<typeof createMessageSchema>;
