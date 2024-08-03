# Use Node.js 18.19.0 as the base image
FROM node:18.19.0

# Set the working directory
WORKDIR /app

# Install Angular CLI version 18.1.2
RUN npm install -g @angular/cli@18.1.2

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install PrimeNG and Angular Material
RUN npm install primeng @angular/material

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Command to start the Angular application
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
