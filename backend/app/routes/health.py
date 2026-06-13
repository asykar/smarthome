from fastapi import APIRouter
from sqlalchemy import text
from app.database import engine

router = APIRouter()

@router.get("/health")
def health_check():
    db_status = "ok"
    try:
        # Check database connection using a raw SELECT 1 query
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
    except Exception as e:
        # Avoid crashing if the database is offline or not created yet
        db_status = "error"

    overall_status = "ok" if db_status == "ok" else "error"

    return {
        "status": overall_status,
        "service": "smarthome-backend",
        "version": "0.1.0",
        "checks": {
            "backend": "ok",
            "database": db_status,
            "mqtt": "not_configured"
        }
    }
