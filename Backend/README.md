# AI Chat — Backend

FastAPI REST API for the AI Chat application. It stores conversations
and messages in MySQL and calls the OpenAI API to generate assistant replies.

## Structure

```
Backend/
├── app/
│   ├── main.py          # FastAPI app, CORS, router wiring
│   ├── database.py      # MySQL connection + session handling
│   ├── models.py        # SQLAlchemy models (Conversation, Message)
│   ├── schemas.py       # Pydantic request/response models
│   ├── routers/
│   │   ├── health.py        # GET /api/health
│   │   └── conversations.py  # conversation + message endpoints
│   └── services/
│       └── openai_service.py # isolated OpenAI integration
├── requirements.txt
├── .env.example
├── Postman/
│   └── AI-Chat.postman_collection.json
└── README.md
```

## Endpoints

| Method | Path                                          | Description                          |
| ------ | --------------------------------------------- | ------------------------------------ |
| GET    | `/api/health`                                 | Check that the backend is running    |
| POST   | `/api/conversations`                          | Create a new conversation            |
| GET    | `/api/conversations/{id}/messages`            | List messages (chronological order)  |
| POST   | `/api/conversations/{id}/messages`            | Send a user message, get AI reply    |
| DELETE | `/api/conversations/{id}`                     | Delete a conversation and messages   |

## Setup

```bash
# from the Backend folder
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS / Linux:
source venv/bin/activate

pip install -r requirements.txt

# create your .env file from the example and fill in the values
copy .env.example .env      # Windows
# cp .env.example .env       # macOS / Linux
```

Make sure MySQL is running and the database has been imported
(see `Database/chat_project.sql`).

## Run

```bash
uvicorn app.main:app --reload
```

The API runs at http://localhost:8000 and interactive docs are at
http://localhost:8000/docs.

## Notes

- The OpenAI API key is read from `.env` and used **only** on the backend.
- If no API key is configured, sending a message returns a clear `503` error
  (the server does not crash). Set `DEV_FALLBACK=true` to return a clearly
  marked fake reply for demos without a key.
