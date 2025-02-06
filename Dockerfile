# syntax=docker/dockerfile:1.0.0-experimental

# BuildKit enables advanced features like cache mounts and build-time arguments.
# Enable Docker BuildKit by specifying this syntax at the top.

ARG NODE_VERSION=23.7.0

# Use the official Node.js image as the base for our application.
FROM node:${NODE_VERSION}-alpine AS base

# Set the default environment to production for optimal performance.
ENV NODE_ENV=production

# Set the working directory inside the container.
WORKDIR /src

# Expose the port the application listens on. (Cloud Run will map this to the container port)
EXPOSE 3000

# Download dependencies as a separate layer to take advantage of Docker's caching mechanism.
# Use BuildKit cache mounts for faster builds (especially for npm packages).
# Cache the npm modules using the /root/.npm directory to speed up subsequent builds.
# This will avoid re-downloading dependencies if they haven't changed.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Use a non-root user for security purposes.
USER node

# Copy the rest of the application code into the container.
COPY . /src

# Start the application.
CMD ["node", "index.js"]
