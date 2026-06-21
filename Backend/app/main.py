import os

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError

from .database import Base, engine
from .routers import conversations, health

load_dotenv()

app = FastAPI(title="AI Chat API", description="AI Chat REST API", version="1.0.0")

# allow the React dev server (Vite) to call the API
default_origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
env_origins = os.getenv("CORS_ORIGINS", "")
allowed_origins = default_origins + [o.strip() for o in env_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    # create tables if they don't exist yet
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as exc:
        print(f"[startup] Could not create tables (is MySQL running?): {exc}")


# return a clean error (and keep CORS headers) if the database is down
@app.exception_handler(SQLAlchemyError)
async def database_exception_handler(request: Request, exc: SQLAlchemyError):
    print(f"[database] {type(exc).__name__}: {exc}")
    return JSONResponse(
        status_code=503,
        content={
            "detail": "Database connection failed. Check that MySQL is running and the DB_* values in Backend/.env are correct."
        },
    )


app.include_router(health.router)
app.include_router(conversations.router)


@app.get("/")
def root():
    return {"message": "AI Chat API. See /docs for the API documentation."}
