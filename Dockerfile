FROM node:18-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build


FROM node:18-alpine
WORKDIR /app

# Install Python
RUN apk add --no-cache python3 py3-pip

# Copy and install Python dependencies
COPY server/requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy server code
COPY server/ ./

# Copy built Next.js app
COPY --from=client-builder /app/client/.next/standalone ./nextjs
COPY --from=client-builder /app/client/.next/static ./nextjs/.next/static
COPY --from=client-builder /app/client/public ./nextjs/public

# Create startup script
RUN echo '#!/bin/sh\n\
cd /app/nextjs && node server.js &\n\
cd /app && python3 app.py &\n\
wait' > /app/start.sh && chmod +x /app/start.sh

EXPOSE 3000 5000

CMD ["/app/start.sh"]