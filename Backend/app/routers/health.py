from fastapi import APIRouter

from ..schemas import HealthOut

router = APIRouter(prefix="/api", tags=["health"])


@router.get("/health", response_model=HealthOut)
def health_check():
    return HealthOut(status="ok", message="AI Chat backend is running.")
