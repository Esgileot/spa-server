# syntax=docker/dockerfile:1

# Start your image with a node base image
FROM node:18-alpine

# Create an application directory
RUN mkdir -p /app

# Set the /app directory as the working directory for any command that follows
WORKDIR /app

# Copy the local app package and package-lock.json file to the container
COPY package*.json ./
COPY .env ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

# Copy local directories to the working directory of our docker image (/app)
COPY ./src ./src

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install \ && npm run build
    # && npm i -g @nestjs/cli \

# Specify that the application in the container listens on port 3000
EXPOSE 8000

# Start the app using serve command
CMD [ "npm", "start" ]
