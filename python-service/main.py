from fastapi import FastAPI
from dto import MessageBody
import json
from utils import *
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(','),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
def chat(message: MessageBody):
    user_message = message.message
    
    with open("faq.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    
    words = user_message.split()
    best_match = None
    best_score = 0
    
    for line in data:
        score = 0
        for kw in line["keywords"]:
            kw_norm = normalize(kw)
            if any(kw_norm in w or w in kw_norm for w in words):
                score += 1
        if score > best_score:
            best_match = line
            best_score = score

    if best_match:
        save_logs(user_message, best_match["a"], best_match["id"])
        return {
            "answer": best_match["a"],
            "sources": best_match["id"],
        }
        
    save_logs(user_message, "Aucune réponse trouvée", None)
    return {
        "answer": "Désolé, je n’ai pas trouvé de réponse à votre question.",
        "sources": ""
    }