FROM node:18

WORKDIR /usr/src/app

# Copy all files
COPY . .

# Install dependencies
RUN npm install

# Build TypeScript code
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"] 