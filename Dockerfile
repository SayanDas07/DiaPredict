FROM node:18-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build


FROM python:3.10-slim
WORKDIR /app

# Install Python dependencies
COPY server/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy server code
COPY server/ ./

# Copy built Next.js app from previous stage
COPY --from=client-builder /app/client/out ./static

# Expose port
EXPOSE 5000

# Run Flask server
CMD ["python", "app.py"]