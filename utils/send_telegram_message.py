import requests
import os
from django.conf import settings

TOKEN = "7720459194:AAGOywcphZAK8pTwIwdPp2uVYwMKw40ZugA"

# Преобразуем путь к абсолютному
ALLOWED_USERS_PATH = os.path.join(settings.BASE_DIR, "pages", "home", "management", "allowed_users.txt")
# print("🔍 Путь к allowed_users.txt:", ALLOWED_USERS_PATH)
# print("📂 Существует ли файл?", os.path.exists(ALLOWED_USERS_PATH))

def load_allowed_users():
    if not os.path.exists(ALLOWED_USERS_PATH):
        raise FileNotFoundError(f"Файл не найден: {ALLOWED_USERS_PATH}")
    with open(ALLOWED_USERS_PATH, "r", encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip()]

def send_telegram_message_to_allowed_users(message: str):
    users = load_allowed_users()
    for user_id in users:
        requests.post(
            f"https://api.telegram.org/bot{TOKEN}/sendMessage",
            data={
                "chat_id": user_id,
                "text": message
            }
        )
