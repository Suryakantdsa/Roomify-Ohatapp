// declare global {
//   namespace Express {
//     interface Request {
//       userId: String; // Add user to the Request interface
//     }
//   }
// }
// types.d.ts
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // Add the `userId` property
    }
  }
}
