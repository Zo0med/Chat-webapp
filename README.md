# ChatApp

## Disclaimer

This project is intended for learning purposes only and is not designed for production use. Security implementations may not follow best practices.

## Overview

ChatApp is a simple real-time chat application built as a fun project to explore new libraries and authentication processes, such as JWT authentication and secure password management. This repository contains the front-end implementation.

## Tech Stack

### Frontend:

- **React.js** – Used for building the user interface
- **React Router** – Enables navigation between different views

### Backend:

- **Node.js** – The runtime environment
- **Express.js** – Manages server-side logic and API endpoints
- **Socket.io** – Implements real-time communication
- **Mongoose** – Object Data Modeling (ODM) library for MongoDB
- **MongoDB** – NoSQL database for storing user and chat data

## How It Works

This project is divided into two parts:

1. **Frontend (React.js)** – The user interface allowing users to send and receive messages.
2. **Backend (Node.js & Express.js)** – Handles authentication, database interactions, and real-time messaging using Socket.io.

The database used is **MongoDB (Community Atlas Server)**, which is locally hosted. The backend connects to MongoDB via the **Mongoose** library to manage data models and queries.

## Setup Instructions

To run this project locally, follow these steps:

### Prerequisites

- Install **Node.js** and **npm**
- Install **MongoDB Community Server**

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Zo0med/Chat-webapp.git
   cd Chat-webapp
   ```

2. Configure the database connection:

   - Edit your **.env** file to specify the MongoDB connection URL.
   - Example format:
     ```sh
     MONGO_URI=mongodb://127.0.0.1:27017/yourDatabaseName
     ```

3. Choose a port (default is recommended to avoid conflicts).

4. Install dependencies for both the frontend and backend:

   ```sh
   cd server && npm install
   cd ../client && npm install
   ```

5. Build the frontend:

   ```sh
   cd client
   npm run build
   ```

6. Start the backend server:

   ```sh
   cd ../server
   npm run start
   ```

## Features

- User authentication with JWT
- Secure password management
- Real-time messaging using Socket.io
- Persistent data storage with MongoDB

## License

This project is open-source and available under the MIT License.

