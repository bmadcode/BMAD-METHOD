import asyncio
from google.adk.agents import LlmAgent
from google.adk.runners import Runner
from google.adk.sessions import VertexAiSessionService
from google.adk.artifacts import GcsArtifactService
from google.adk.memory import VertexAiRagMemoryService
from google.adk.models import Gemini

from config.settings import settings
from agents.{{primary_team}}.{{main_orchestrator}} import {{MainOrchestratorClass}}

class {{CompanyName}}AISystem:
    def __init__(self):
        self.settings = settings
        self.runner = None
        self.main_orchestrator = None
        
    async def initialize(self):
        """Initialize the AI agent system"""
        
        # Create main orchestrator
        self.main_orchestrator = {{MainOrchestratorClass}}()
        
        # Initialize services
        session_service = VertexAiSessionService(
            project=self.settings.project_id,
            location=self.settings.location
        )
        
        artifact_service = GcsArtifactService(
            bucket_name=self.settings.bucket_name
        )
        
        memory_service = VertexAiRagMemoryService(
            rag_corpus=f"projects/{self.settings.project_id}/locations/{self.settings.location}/ragCorpora/{{COMPANY_NAME}}-knowledge"
        )
        
        # Create runner
        self.runner = Runner(
            app_name=f"{self.settings.company_name}-AI-System",
            agent=self.main_orchestrator,
            session_service=session_service,
            artifact_service=artifact_service,
            memory_service=memory_service
        )
        
        print(f"✅ {self.settings.company_name} AI Agent System initialized successfully!")
        
    async def run_agent_interaction(self, user_id: str, session_id: str, message: str):
        """Run agent interaction"""
        if not self.runner:
            await self.initialize()
            
        async for event in self.runner.run_async(
            user_id=user_id,
            session_id=session_id,
            new_message=message
        ):
            yield event

# Application factory
async def create_app():
    ai_system = {{CompanyName}}AISystem()
    await ai_system.initialize()
    return ai_system

if __name__ == "__main__":
    # Development server
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)