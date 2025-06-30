# Stage 1: Build the React app
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy app and build it
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: overwrite default nginx config (for single page app routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

ENV CHOKIDAR_USEPOLLING=true