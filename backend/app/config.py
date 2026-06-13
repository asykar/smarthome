import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Load env variables from root directory first, then fallback to current folder
# Try to look for .env in root directory (since we run from root or backend)
root_env = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), '.env')
local_env = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env')

if os.path.exists(root_env):
    load_dotenv(root_env)
elif os.path.exists(local_env):
    load_dotenv(local_env)
else:
    load_dotenv()

class Settings(BaseSettings):
    APP_NAME: str = os.getenv("APP_NAME", "Smarthome App")
    APP_ENV: str = os.getenv("APP_ENV", "development")
    APP_DEBUG: bool = os.getenv("APP_DEBUG", "true").lower() in ("true", "1", "yes")
    
    BACKEND_HOST: str = os.getenv("BACKEND_HOST", "0.0.0.0")
    BACKEND_PORT: int = int(os.getenv("BACKEND_PORT", 8000))
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./data/smarthome.db")
    
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "change-this-secret-key")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    JWT_EXPIRE_MINUTES: int = int(os.getenv("JWT_EXPIRE_MINUTES", 1440))
    
    MQTT_HOST: str = os.getenv("MQTT_HOST", "localhost")
    MQTT_PORT: int = int(os.getenv("MQTT_PORT", 1883))
    MQTT_USERNAME: str = os.getenv("MQTT_USERNAME", "smarthome")
    MQTT_PASSWORD: str = os.getenv("MQTT_PASSWORD", "change-this-password")
    
    TIMEZONE: str = os.getenv("TIMEZONE", "Asia/Jakarta")

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
