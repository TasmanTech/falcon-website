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

# Pass in NEXT_PUBLIC_ env vars so Next.js can inline them during the build
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

# Build the frontend workspace
RUN npm run build:frontend

# Secure runtime stage (distroless)
FROM cgr.dev/chainguard/node:latest

WORKDIR /app

# Copy built application and dependencies from builder
COPY --from=builder --chown=node:node /app /app

# Expose port (Cloud Run sets PORT=8080 automatically)
EXPOSE 8080

ENV HOSTNAME="0.0.0.0"

# Start the frontend workspace directly (the base image has ENTRYPOINT ["node"])
CMD ["./node_modules/next/dist/bin/next", "start", "apps/front-end"]
