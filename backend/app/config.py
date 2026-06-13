import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Smarthome App"
    APP_ENV: str = "development"
    APP_DEBUG: bool = True
    
    BACKEND_HOST: str = "0.0.0.0"
    BACKEND_PORT: int = 8000
    
    DATABASE_URL: str = "sqlite:///./data/smarthome.db"
    
    JWT_SECRET_KEY: str = "change-this-secret-key"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 1440
    
    MQTT_HOST: str = "localhost"
    MQTT_PORT: int = 1883
    MQTT_USERNAME: str = "smarthome"
    MQTT_PASSWORD: str = "change-this-password"

    class Config:
        env_file = ".env"

settings = Settings()
