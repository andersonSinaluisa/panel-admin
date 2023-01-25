# Use an official Node.js runtime as the base image
FROM node:14.19.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Build the project
RUN npm run build

# Use NGINX as the final base image
FROM nginx:alpine

# Copy the built project files from the previous step to the NGINX container
COPY --from=0 /app/build /usr/share/nginx/html

# Copy the NGINX configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]