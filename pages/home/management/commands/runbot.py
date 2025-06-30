from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes
from django.core.management.base import BaseCommand
import os
from django.conf import settings

TOKEN = "7720459194:AAGOywcphZAK8pTwIwdPp2uVYwMKw40ZugA"
KEYWORD = "пчёлка"

ALLOWED_USERS_PATH = os.path.join(settings.BASE_DIR, "pages", "home", "management", "allowed_users.txt")

def load_allowed_users():
    if not os.path.exists(ALLOWED_USERS_PATH):
        return set()
    with open(ALLOWED_USERS_PATH, "r", encoding="utf-8") as f:
        return set(line.strip() for line in f if line.strip())

def add_allowed_user(user_id: str):
    with open(ALLOWED_USERS_PATH, "a", encoding="utf-8") as f:
        f.write("\n" + user_id)

async def handle_keyword(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = str(update.effective_chat.id)
    message_text = update.message.text.strip().lower()

    if message_text == KEYWORD:
        allowed = load_allowed_users()
        if chat_id in allowed:
            await update.message.reply_text("✅ Ты уже подписан на уведомления.")
        else:
            add_allowed_user(chat_id)
            await update.message.reply_text("🎉 Поздравляю! Ты теперь подписан на уведомления.")
    else:
        await update.message.reply_text("❌ Неверное ключевое слово. Попробуй ещё раз.")

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Чтобы подписаться на уведомления, пришли мне ключевое слово 🗝️")

class Command(BaseCommand):
    help = "Запуск telegram-бота"

    def handle(self, *args, **kwargs):
        app = ApplicationBuilder().token(TOKEN).build()

        app.add_handler(CommandHandler("start", start))
        app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_keyword))

        app.run_polling()