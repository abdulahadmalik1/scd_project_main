# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Directly modify API URLs in source files before building
# Replace localhost:5000 with backend:5000
RUN find src -type f -name "*.js" -exec sed -i 's|http://localhost:5000/api|http://backend:5000/api|g' {} \;

# Build the app
RUN npm run build

# Production stage
FROM node:18-alpine

# Install serve
RUN npm install -g serve

# Create app directory
WORKDIR /app

# Copy built files from build stage
COPY --from=build /app/build ./build

# Expose port
EXPOSE 3000

# Start serve
CMD ["serve", "-s", "build", "-l", "3000"]