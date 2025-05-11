# app/backend/Dockerfile
FROM node:18

# 1. Set working dir
WORKDIR /usr/src/app

# 2. Install dependencies
COPY package*.json ./
RUN npm install

# 3. Copy source
COPY . .

# 4. Expose port & start
EXPOSE 5000
CMD ["node", "server.js"]
