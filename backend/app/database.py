from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .config import settings

# For SQLite, we need connect_args={"check_same_thread": False}
engine = create_engine(
    settings.DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

from app.models.base import Base

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
