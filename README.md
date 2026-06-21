# AI Chat

The project is a simple AI chat website. The user can send messages, continue the same conversation and start a new chat when needed.

The frontend is built with React, the backend is built with FastAPI, and all messages are saved in MySQL.

## Technologies

Frontend:

* React
* Vite
* JavaScript
* React Router
* Axios
* CSS

Backend:

* Python
* FastAPI
* SQLAlchemy
* OpenAI API

Database:

* MySQL

## Project Folders

```text
Eric Eliash/
├── Backend/
├── Database/
├── Frontend/
├── README.md
└── .gitignore
```

The database export is located in:

```text
Database/chat_project.sql
```

The Postman collection is located in:

```text
Backend/Postman/AI-Chat.postman_collection.json
```

## Database

First, import the database file into MySQL Workbench.

The database name is:

```text
chat_project
```

The database has two main tables:

```text
conversations
messages
```

The conversations table stores the chats.

The messages table stores the user and assistant messages.

## Backend

Open a terminal inside the Backend folder:

```bash
cd Backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

Install the packages:

```bash
pip install -r requirements.txt
```

Create a `.env` file and add the database details and OpenAI key:

```env
OPENAI_API_KEY=your-key
OPENAI_MODEL=gpt-4o-mini

DB_HOST=localhost
DB_PORT=3306
DB_NAME=chat_project
DB_USER=root
DB_PASSWORD=your-password
```

Run the backend:

```bash
python -m uvicorn app.main:app --reload
```

The backend runs on:

```text
http://localhost:8000
```

FastAPI docs:

```text
http://localhost:8000/docs
```

## Frontend

Open another terminal and go to the Frontend folder:

```bash
cd Frontend
```

Install the packages:

```bash
npm install
```

Run the project:

```bash
npm run dev
```

The website runs on:

```text
http://localhost:5173
```

## Main Features

* Send messages to the AI
* Continue the same conversation
* Start a new chat
* Save messages in MySQL
* Home page
* About page
* Loading and error messages

## Postman

To test the API, import this file into Postman:

```text
Backend/Postman/AI-Chat.postman_collection.json
```

The collection contains requests for:

* Health Check
* Create Conversation
* Send Message
* Get Messages
* Delete Conversation

## How It Works

The user sends a message from the React website.

The message is sent to the FastAPI backend and saved in MySQL.

The backend sends the conversation to the OpenAI API and saves the answer.

After that, the answer is displayed on the website.

## Developer

Eric Eliash

Full Stack Developer Student

## GitHub

https://github.com/EricEliash/Ai-Chat-Project