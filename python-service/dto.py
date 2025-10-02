from pydantic import BaseModel

class MessageBody(BaseModel):
    message: str