from fastapi import FastAPI
from .dto import MessageBody

app = FastAPI()

@app.post("/chat")
def chat(message: MessageBody):
    user_message = message.message
    