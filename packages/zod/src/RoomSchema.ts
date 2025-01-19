import z from "zod";

export const createRoomSchema = z.object({
  name: z
    .string()
    .max(50, "room name exceed the length")
    .min(1, "room name invalid")
    .optional(),
  isGroup: z.boolean().default(false),
});

export type Room_POST = z.infer<typeof createRoomSchema>;
