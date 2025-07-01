import requests
from apps.catalog.models import TelegramUser  # Импортируй модель

TOKEN = "7720459194:AAEVPPTVO3tzfRsXzR6Wq0fkVLpj5b8vfvg"

def send_telegram_message_to_allowed_users(message: str):
    users = TelegramUser.objects.all()
    for user in users:
        try:
            requests.post(
                f"https://api.telegram.org/bot{TOKEN}/sendMessage",
                data={
                    "chat_id": user.user_id,
                    "text": message
                }
            )
        except Exception as e:
            print(f"Ошибка при отправке {user}: {e}")