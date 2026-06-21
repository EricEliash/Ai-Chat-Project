# OpenAI integration

import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini").strip() or "gpt-4o-mini"

# demo reply when no API key is set (for testing without OpenAI)
DEV_FALLBACK = os.getenv("DEV_FALLBACK", "false").strip().lower() == "true"

SYSTEM_PROMPT = (
    "You are AI Chat, a friendly and helpful assistant. "
    "Answer clearly and concisely."
)


class OpenAIServiceError(Exception):
    pass


def _client() -> OpenAI:
    return OpenAI(api_key=OPENAI_API_KEY)


# send the full conversation history to OpenAI and return the reply
def get_ai_response(history: list[dict]) -> str:
    if not OPENAI_API_KEY:
        if DEV_FALLBACK:
            last_user = next(
                (m["content"] for m in reversed(history) if m["role"] == "user"),
                "",
            )
            return (
                "[DEV FALLBACK — no OpenAI API key configured] "
                f"You said: \"{last_user}\". "
                "Set OPENAI_API_KEY in your .env file to get real AI answers."
            )
        raise OpenAIServiceError(
            "OpenAI API key is not configured. Add OPENAI_API_KEY to your .env file."
        )

    messages = [{"role": "system", "content": SYSTEM_PROMPT}, *history]
    try:
        completion = _client().chat.completions.create(
            model=OPENAI_MODEL,
            messages=messages,
        )
        return completion.choices[0].message.content.strip()
    except Exception as exc:
        raise OpenAIServiceError(f"OpenAI request failed: {exc}") from exc
