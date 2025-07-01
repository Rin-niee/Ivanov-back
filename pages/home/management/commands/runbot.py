from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes, ConversationHandler
from asgiref.sync import sync_to_async
from django.core.management.base import BaseCommand
from apps.catalog.models import TelegramUser
from django.db.utils import IntegrityError
import traceback

TOKEN = "7720459194:AAEVPPTVO3tzfRsXzR6Wq0fkVLpj5b8vfvg"
KEYWORD = "автомобиль"

@sync_to_async
def user_exists(user_id):
    return TelegramUser.objects.filter(user_id=user_id).exists()

@sync_to_async
def create_user(user_id, username):
    return TelegramUser.objects.create(user_id=user_id, username=username)

WAITING_FOR_KEYWORD = 1

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Чтобы подписаться на уведомления, пришли мне ключевое слово 🗝️")
    return WAITING_FOR_KEYWORD

async def handle_keyword(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = str(update.effective_chat.id)
    username = update.effective_user.username or ""
    message_text = update.message.text.strip().lower().replace("\u200b", "")

    print(f"[DEBUG] message_text: '{message_text}' | KEYWORD: '{KEYWORD}'")
    print(f"[DEBUG] сравнение: {message_text == KEYWORD}")

    if message_text == KEYWORD:
        try:
            if await user_exists(chat_id):
                await update.message.reply_text("✅ Ты уже подписан на уведомления.")
            else:
                await create_user(chat_id, username)
                await update.message.reply_text("🎉 Ты теперь подписан на уведомления!")
        except Exception as e:
            print(f"[ОШИБКА]: {e}")
            await update.message.reply_text("❌ Ошибка при подписке. Сообщи разработчику.")
        return ConversationHandler.END
    else:
        await update.message.reply_text("❌ Неверное ключевое слово. Попробуй ещё раз.")
        return WAITING_FOR_KEYWORD

async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("❌ Подписка отменена.")
    return ConversationHandler.END

class Command(BaseCommand):
    help = "Запуск telegram-бота"

    def handle(self, *args, **kwargs):
        app = ApplicationBuilder().token(TOKEN).build()

        conv_handler = ConversationHandler(
            entry_points=[CommandHandler("start", start)],
            states={
                WAITING_FOR_KEYWORD: [
                    MessageHandler(filters.TEXT & ~filters.COMMAND, handle_keyword),
                ],
            },
            fallbacks=[CommandHandler("cancel", cancel)],
        )

        app.add_handler(conv_handler)
        app.run_polling()