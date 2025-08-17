import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    # Google Cloud Configuration
    project_id: str = "{{PROJECT_ID}}"
    location: str = "{{LOCATION}}"  # e.g., "us-central1"
    
    # Company Information
    company_name: str = "{{COMPANY_NAME}}"
    industry: str = "{{INDUSTRY}}"
    business_type: str = "{{BUSINESS_TYPE}}"
    
    # Agent Configuration
    default_model: str = "gemini-1.5-pro"
    max_iterations: int = 10
    timeout_seconds: int = 300
    
    # Storage Configuration
    bucket_name: str = "{{COMPANY_NAME}}-ai-agents-storage"
    database_name: str = "{{COMPANY_NAME}}-ai-agents-db"
    
    # API Configuration
    session_service_type: str = "vertex"  # or "in_memory" for development
    artifact_service_type: str = "gcs"    # or "in_memory" for development
    memory_service_type: str = "vertex"   # or "in_memory" for development
    
    # Security
    service_account_path: str = "./{{COMPANY_NAME}}-ai-agents-key.json"
    
    class Config:
        env_file = ".env"

settings = Settings()