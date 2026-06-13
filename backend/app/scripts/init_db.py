import os
import sys

# Add backend directory to sys.path so we can import app
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.database import engine
from app.models.base import Base

def init_db():
    print("Inisialisasi database SQLite...")
    
    # Ensure the parent directory of the database file exists
    from app.config import settings
    db_url = settings.DATABASE_URL
    if db_url.startswith("sqlite:///"):
        db_path = db_url.replace("sqlite:///", "")
        
        # Resolve paths relative to working directory or backend directory
        # If absolute, it stays absolute. If relative like ./data/smarthome.db, we create it.
        db_dir = os.path.dirname(db_path)
        if db_dir and not os.path.exists(db_dir):
            print(f"Membuat direktori database: {db_dir}")
            os.makedirs(db_dir, exist_ok=True)
            
    Base.metadata.create_all(bind=engine)
    print("Database SQLite berhasil diinisialisasi!")

if __name__ == "__main__":
    init_db()
