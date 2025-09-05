# Use the official Node.js LTS image as a base
FROM node:20-alpine

# Install Postgres client so pg_isready is available
RUN apk add --no-cache postgresql-client bash

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Use the await-db.sh script as the entrypoint
CMD ["node", "--loader", "ts-node/esm", "src/index.ts"]
