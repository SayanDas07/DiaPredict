FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Let Docker expose a default port (optional, can match local testing)
EXPOSE 7860

# Use Render-assigned port
CMD ["sh", "-c", "gunicorn app:app --bind 0.0.0.0:${PORT:-7860}"]
