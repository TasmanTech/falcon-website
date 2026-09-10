# Builder stage with shell and build tools
FROM cgr.dev/chainguard/node:latest-dev AS builder

# Switch to root to avoid permission issues during build
USER root
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
COPY apps/front-end/package.json ./apps/front-end/
COPY apps/back-end/package.json ./apps/back-end/

# Install dependencies (using npm ci for consistent installs)
RUN npm ci

# Copy the rest of the monorepo source code
COPY . .

# Build the backend workspace
RUN npm run build:backend

# Secure runtime stage (distroless)
FROM cgr.dev/chainguard/node:latest

WORKDIR /app

# Copy built application and dependencies from builder
COPY --from=builder --chown=node:node /app /app

# Expose port (Cloud Run sets PORT=8080 automatically)
EXPOSE 8080

# Start the backend workspace directly (the base image has ENTRYPOINT ["node"])
CMD ["apps/back-end/dist/main.js"]
