from pydantic import BaseModel

class Query(BaseModel):
    question: str

    class Config:
        json_schema_extra = {
            "example": {
                "question": "O que é tabagismo?",
            }
        }