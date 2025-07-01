FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


CMD ["npm", "run", "dev"]

# Optional: overwrite default nginx config (for single page app routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf


