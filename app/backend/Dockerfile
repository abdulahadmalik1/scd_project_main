# Use Node.js LTS version
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Expose the port
EXPOSE 5000

# Start the application - CHANGED FROM index.js TO server.js
CMD ["node", "server.js"]