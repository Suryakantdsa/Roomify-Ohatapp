# Roomify

Roomify is a real-time chat application built using WebSockets. Users can create rooms, chat within rooms, or send direct messages to other users.

## Project Structure
- **backend/**: Contains the server-side code.
- **frontend/**: Contains the client-side code.

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the TypeScript code:
   ```bash
   npm run build
   ```
4. Start the server:
   ```bash
   npm start
   ```
   The WebSocket server will be running on `ws://localhost:8080`.

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```
   The frontend will be accessible at `http://localhost:3000`.

## Features
- Create and join chat rooms.
- Send messages within rooms.
- Directly message individual users.
- Real-time communication with WebSocket.

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests to improve Roomify.

## License
This project is licensed under the [MIT License](LICENSE).
