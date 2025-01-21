# Step 1: Build the React application
FROM node:18-alpine AS build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve the application using nginx
FROM nginx:stable-alpine

# Copy the build output to nginx's default html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the server
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
