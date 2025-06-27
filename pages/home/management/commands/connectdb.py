import psycopg2

try:
    conn = psycopg2.connect(
        dbname="postgres",
        user="user",
        password="121212",
        host="localhost",
        port="5432"
    )
    print("🎉 Подключение успешно!")
    conn.close()
except Exception as e:
    print("❌ Ошибка подключения:", e)