# Use Node.js 20 as a parent image
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Clone the repository
RUN git clone https://github.com/medusajs/medusa-starter-default.git .

# Install dependencies
RUN yarn install

# Build the application
RUN yarn build

# SECOND STAGE: Minimal image for running the application
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app .

# Expose the application port
EXPOSE 9000