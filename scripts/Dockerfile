FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (including tsx)
RUN npm ci

# Copy source files
COPY src/ ./src/

# Expose port (Cloud Run will set PORT env var)
EXPOSE 8080

# Run the server
CMD ["npm", "start"]

