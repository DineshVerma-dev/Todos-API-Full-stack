# Todo Full Stack Project

## Introduction
This is a full stack Todo application. The project includes both frontend and backend components.

## Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

### Backend
1. Navigate to the backend directory:
    ```bash
    cd server
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the backend directory and add your MongoDB connection string:
    ```
    MONGO_URI=your_mongodb_connection_string
    ```
4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Start the frontend development server:
    ```bash
    npm start
    ```

## Running the Project
1. Ensure MongoDB is running.
2. Start the backend server.
3. Start the frontend server.
4. Open your browser and navigate to `http://localhost:3000`.

## API Routes

### Todo Routes
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo by ID
- `DELETE /api/todos/:id` - Delete a todo by ID

## Conclusion
You should now have the Todo application running locally. Feel free to explore and modify the code to suit your needs.