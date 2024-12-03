# Use official Node.js alpine image for smaller image size
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./package.json

# Install dependencies
RUN npm install

# Copy entire project
COPY . .

# Expose port
EXPOSE 4000

# Default command
CMD ["node", "index.js"]