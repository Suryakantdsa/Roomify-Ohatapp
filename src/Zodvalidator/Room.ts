import { z } from "zod";

// Room_POST schema
export const Room_POST = z.object({
  slug: z.string().min(1, "Slug cannot be empty"),
});

export type RoomPOST = z.infer<typeof Room_POST>;

// Room_PATCH schema
export const Room_PATCH = z.object({
  slug: z.string().min(1, "Slug cannot be empty").optional(),
  adminId: z.string().optional(),
  id: z.number().int("ID must be an integer").optional(),
});

export type RoomPATCH = z.infer<typeof Room_PATCH>;

// Room_QUERY schema
export const Room_QUERY = z.object({
  slug: z.string().optional(),
  adminId: z.string().optional(),
  id: z.number().int("ID must be an integer").optional(),
});

export type RoomQUERY = z.infer<typeof Room_QUERY>;

// Room_GET schema
export const Room_GET = z.array(
  z.object({
    id: z.number().int("ID must be an integer"),
    slug: z.string(),
    adminId: z.string(),
    createdAt: z.string().datetime("Invalid date-time format"),
  })
);

export type RoomGET = z.infer<typeof Room_GET>;

// Usage Example
/*
  Room_POST: Used for creating a new room.
  Room_PATCH: Used for updating an existing room.
  Room_QUERY: Used for querying rooms.
  Room_GET: Used for fetching room details in an array.
*/
