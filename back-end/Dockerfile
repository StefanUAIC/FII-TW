# Run stage
# Fetching latest version of Node
FROM node:latest

# Setting up work directory
WORKDIR /app

# Copy the src directory into our app
COPY ./ /app

RUN ["npm", "install"]

# Starting the application
CMD ["npm", "start", "--prefix", "/app"]
