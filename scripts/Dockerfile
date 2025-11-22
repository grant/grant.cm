FROM node:20-slim

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json ./

# Install all dependencies (including tsx)
RUN pnpm install --frozen-lockfile --prod=false

# Copy source files
COPY src/ ./src/

# Expose port (Cloud Run will set PORT env var)
EXPOSE 8080

# Run the server
CMD ["pnpm", "start"]

