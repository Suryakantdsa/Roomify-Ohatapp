import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });
console.log("websocket server is running on ws://localhost:8080");

interface User {
  socket: WebSocket | null;
  userId: string;
  roomId?: string[];
  avatar: string;
  name: string;
  phone?: string;
}

const allUser: User[] = [];

interface Rooms {
  name: string;
  roomId: string;
  avatar?: string;
  createdBy: string;
}

const rooms: Rooms[] = [];

enum Event {
  USER_JOIN = "user_join",
  CREAT_ROOM = "creat_room",
  JOIN_ROOM = "join_room",
  CHAT_ROOM = "chat_room",
  CHAT_USER = "chat_user",
  LEAVE_ROOM = "leave_room",
}

interface UserJoinRequest {
  event: "user_join";
  payload: {
    name: string;
    phone?: string;
    avatar?: string;
  };
}
interface UserJoinResponse {
  event: "user_joined";
  payload: {
    userId: string;
    name: string;
    phone?: string;
    avatar?: string;
    joinedAt: Date;
  };
}

interface CreateRoomRequest {
  event: Event.CREAT_ROOM;
  payload: {
    name: string;
    createdBy: string;
    avatar?: string;
  };
}
interface JoinRoomRequest {
  event: Event.JOIN_ROOM;
  payload: {
    roomId: string;
    userId: string;
    avatar?: string;
    name?: string;
  };
}
interface CreateRoomReponse {
  event: "room_created";
  payload: {
    name: string;
    roomId: string;
    createdBy: string;
    avatar?: string;
  };
}
interface ChatRoomRequest {
  event: Event.CHAT_ROOM;
  payload: {
    roomId: string;
    message: string;
    fromUserId: string;
    createdAt?: string;
  };
}
interface ChatUserRequest {
  event: Event.CHAT_USER;
  payload: {
    toUserId: string;
    message: string;
    fromUserId: string;
    createdAt?: string;
  };
}
// interface ChatRoomResponse {
//   event: "room_created";
//   payload: {
//     name: string;
//     roomId: string;
//     createdBy: string;
//     avatar?: string;
//   };
// }

function generateShortUUID() {
  const uuid = crypto.randomUUID().replace(/-/g, "");
  return uuid.substring(0, 8);
}

wss.on("connection", (socket) => {
  console.log("user connected", socket.eventNames);

  socket.on("message", (body) => {
    try {
      const parseBody = JSON.parse(body.toString());

      if (parseBody.event === Event.USER_JOIN) {
        const { event, payload } = parseBody as UserJoinRequest;
        const { name, avatar, phone } = payload;
        if (!name || name.trim() === "") {
          socket.send(
            JSON.stringify({
              error: "Name is required...!",
            })
          );
          return;
        }

        const userId = generateShortUUID();
        allUser.push({
          socket: socket,
          avatar: parseBody.payload.avatar,
          phone: parseBody.payload.phone,
          name: parseBody.payload.name,
          userId: userId,
        } as User);

        const response: UserJoinResponse = {
          event: "user_joined",
          payload: {
            userId: userId,
            name: name,
            avatar: parseBody.payload.avatar,
            phone: parseBody.payload.phone,
            joinedAt: new Date(),
          },
        };
        socket.send(JSON.stringify(response));
      } else if (parseBody.event === Event.CREAT_ROOM) {
        const { event, payload } = parseBody as CreateRoomRequest;

        const { avatar, name, createdBy } = payload;

        if (!name || name.trim() === "") {
          socket.send(
            JSON.stringify({
              error: "Room name is required",
            })
          );
        }

        const isDulicateName = rooms.some((room) => room.name === name);

        if (isDulicateName) {
          socket.send(
            JSON.stringify({
              error: "Duplicate room name",
            })
          );
        }

        //checking the createed By is valid or not

        const checkUserDetails = allUser.find(
          (user) => user.userId === createdBy
        );
        if (!checkUserDetails) {
          socket.send(
            JSON.stringify({
              error: "Invaild userId",
            })
          );
          return;
        }
        const roomId = generateShortUUID();
        checkUserDetails.roomId = checkUserDetails.roomId || [];
        checkUserDetails.roomId.push(roomId);
        rooms.push({
          createdBy: createdBy,
          name: name,
          roomId: roomId,
          avatar: avatar || "",
        });
        const response: CreateRoomReponse = {
          event: "room_created",
          payload: {
            name: name,
            roomId: roomId,
            createdBy: createdBy,
            avatar: avatar || "",
          },
        };
        socket.send(JSON.stringify(response));
      } else if (parseBody.event === Event.JOIN_ROOM) {
        const { event, payload } = parseBody as JoinRoomRequest;

        const { roomId, userId, avatar, name } = payload;

        const userDetails = allUser.find((user) => user.userId === userId);

        if (!userDetails) {
          socket.send(
            JSON.stringify({
              error: "Invalid userId",
            })
          );
          return;
        }
        const roomDetails = rooms.find((room) => room.roomId === roomId);

        if (!roomDetails) {
          socket.send(
            JSON.stringify({
              error: "invalid roomId",
            })
          );
          return;
        }
        if (userDetails?.roomId?.includes(roomId)) {
          socket.send(
            JSON.stringify({
              error: "Already joined the room " + roomId,
            })
          );
          return;
        }
        userDetails.roomId = userDetails?.roomId || [];
        userDetails.roomId.push(roomId);

        socket.send(
          JSON.stringify({
            event: "joined_room",
            payload: {
              roomName: roomDetails.name,
              roomId: roomDetails.roomId,
              avatar: roomDetails.avatar,
              joinedAt: new Date(),
            },
          })
        );
        const roomUser = allUser.filter((user) =>
          user.roomId?.includes(roomId)
        );

        roomUser.forEach((user) => {
          user.socket?.send(
            JSON.stringify({
              event: "user_joined_room",
              payload: {
                roomId: roomDetails.roomId,
                joinedUser: {
                  name: userDetails.name,
                  avatar: userDetails.avatar,
                  userId: userDetails.userId,
                },
              },
            })
          );
        });
      } else if (parseBody.event === Event.CHAT_ROOM) {
        const { event, payload } = parseBody as ChatRoomRequest;
        const { roomId, fromUserId, message } = payload;

        const roomDetails = rooms.find((room) => room.roomId === roomId);
        const userDetails = allUser.find((user) => user.userId === fromUserId);

        if (!userDetails) {
          socket.send(
            JSON.stringify({
              error: "Invalid userId",
            })
          );
          return;
        }
        if (!roomDetails) {
          socket.send(
            JSON.stringify({
              error: "Invalid roomId",
            })
          );
          return;
        }
        const roomUsers = allUser.filter((user) =>
          user.roomId?.includes(roomId)
        );
        roomUsers.forEach((user) => {
          user.socket?.send(
            JSON.stringify({
              event: "message",
              payload: {
                roomId,
                fromUserId,
                message,
                senderName: userDetails.name,
                senderAvatar: userDetails.avatar,
                timestamp: new Date(),
              },
            })
          );
        });
      } else if (parseBody.event === Event.CHAT_USER) {
        const { event, payload } = parseBody as ChatUserRequest;
        const { fromUserId, toUserId, message } = payload;

        const senderDetails = allUser.find(
          (user) => user.userId === fromUserId
        );
        if (!senderDetails) {
          socket.send(
            JSON.stringify({
              erorr: "invaild senderId",
            })
          );
          return;
        }
        const reciverDetails = allUser.find((user) => user.userId === toUserId);
        if (!reciverDetails) {
          socket.send(
            JSON.stringify({
              error: "indvaid reciverId",
            })
          );
          return;
        }
        if (!reciverDetails.socket) {
          socket.send(
            JSON.stringify({ error: ` ${reciverDetails.name} is offine now` })
          );
          return;
        }

        reciverDetails.socket?.send(
          JSON.stringify({
            event: "user_message",
            payload: {
              message,
              senderName: senderDetails.name,
              senderId: senderDetails.userId,
              reciverName: reciverDetails.name,
              reciverId: reciverDetails.userId,
              timestamp: new Date(),
            },
          })
        );
        socket.send(
          JSON.stringify({
            event: "message_sent",
            payload: {
              message,
              reciverName: reciverDetails.name,
              timestamp: new Date(),
            },
          })
        );
      }
    } catch (error) {
      console.error("invalid message format", error);

      socket.send(
        JSON.stringify({
          error: "Invalid message format",
        })
      );
    }
  });

  socket.on("close", () => {
    console.log("user disconnected");

    const userindex = allUser.findIndex((user) => user.socket === socket);
    if (userindex > -1) {
      allUser.splice(userindex, 1);
    }
  });
});

// for create room
/*

        {
            type:"create",
            payload:{
              name:"Room red",
              avatar:"https://pic.jpg"
              roomId:1252(math.random())
            }
        }
*/
// for joining room
/*

        {
            type:"join",
            payload:{
              name:"surya",
              avatar:"https://pic.jpg"
              phone:"75042563656"
              roomId:1252
            }
        }
*/
// for message to a room
/*

        {
            type:"chat_room",
            payload:{
              mesaage:"hi there"
              roomId:1252
            }
        }


        


        {
            type:"chat_user",
            payload:{
              mesaage:"hi there"
              phone:78285828256
            }
        }

         } else if (parseBody.event === Event.CREATE_ROOM) {
    } else if (parseBody.event === Event.JOIN_ROOM) {
    } else if (parseBody.event === Event.LEAVE_ROOM) {
    } else if (parseBody.event === Event.CHAT_ROOM) {
    } else if (parseBody.event === Event.CHAT_USER) {
    }
*/
/*
{
    "event": "create_room",
    "payload": {
        "roomId": "a1b2c3d4",
        "name": "Room Red",
        "avatar": "https://pic.jpg"
    }
}
{
    "event": "join_room",
    "payload": {
        "userId": "user123",
        "name": "Surya",
        "avatar": "https://pic.jpg",
        "roomId": "a1b2c3d4"
    }
}
{
    "event": "message_room",
    "payload": {
        "roomId": "a1b2c3d4",
        "message": "Hi there!",
        "userId": "user123",
        "timestamp": "2025-01-04T10:00:00Z"
    }
}
{
    "event": "message_user",
    "payload": {
        "toUserId": "user456",
        "message": "Hi there!",
        "fromUserId": "user123",
        "timestamp": "2025-01-04T10:00:00Z"
    }
}

*/
