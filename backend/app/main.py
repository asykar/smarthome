from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes import health

app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.APP_DEBUG,
    version="0.1.0"
)

# Set CORS origins for development
origins = [
    "http://localhost:5173",      # Vite React default port
    "http://127.0.0.1:5173",
    "http://localhost:5174",      # Fallback Vite port
    "http://127.0.0.1:5174",
    "http://localhost:3000",      # Alternative frontend port
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register health route under /api prefix
app.include_router(health.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": f"Welcome to {settings.APP_NAME} API"}
