import unicodedata

def normalize(text: str) -> str:
    text = text.lower()
    text = unicodedata.normalize("NFD", text).encode("ascii", "ignore").decode("utf-8")
    return text