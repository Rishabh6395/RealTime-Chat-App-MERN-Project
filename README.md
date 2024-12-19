# Realtime Chat App

## Description
This is a Realtime Chat Application built using the MERN stack. It allows users to communicate with each other in real-time.

## Tech Stack
- **MongoDB**: Database
- **Express.js**: Web framework for Node.js
- **React**: Frontend library
- **Node.js**: Backend runtime environment
- **Socket.io**: Real-time communication

## Features
- Real-time messaging
- User authentication
- Chat rooms

## Installation

### Prerequisites
- Node.js
- MongoDB

### Clone the Repository
```bash
git clone https://github.com/yourusername/realtime-chat-app.git
cd realtime-chat-app
```

### Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Run the Application
```bash
# Start the backend server
cd backend
npm start

# Start the frontend server
cd ../frontend
npm start
```

### Environment Variables
Create a `.env` file in the `backend` directory and add the following:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Usage
1. Open your browser and navigate to `http://localhost:5000`.
2. Register or log in to start chatting.

## License
This project is licensed under the MIT License.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Contact
For any inquiries, please contact [your email].
