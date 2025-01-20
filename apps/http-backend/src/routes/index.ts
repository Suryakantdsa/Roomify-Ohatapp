import auth from "./authRouter";
import chat from "./chatRouter";
import room from "./roomRouter";
import user from "./userRouter";

const router = [auth, chat, room, user];
export default router;
