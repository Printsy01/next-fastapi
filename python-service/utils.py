import unicodedata
import os
from datetime import datetime
from typing import Optional

LOG_DIR = "logs"
LOG_FILE = os.path.join(LOG_DIR, "chat_activity.txt")

def normalize(text: str) -> str:
    text = text.lower()
    text = unicodedata.normalize("NFD", text).encode("ascii", "ignore").decode("utf-8")
    return text

def save_logs(user_input: str, response: str, response_id: Optional[str]):
    os.makedirs(LOG_DIR, exist_ok=True)
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    sources = response_id if response_id else "N/A"
    
    log_entry = (
        f"{timestamp} | "
        f"Message: \"{user_input}\" | "
        f"Réponse: {response}\n | "
        f"Source: {sources}\n"
    )
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(log_entry)
    except IOError as e:
        print(f"Erreur lors de l'écriture du log: {e}")