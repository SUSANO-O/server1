FROM node:22-alpine
WORKDIR /usr/src/app
COPY package*.json ./
# Instalamos nodemon globalmente para evitar el error "not found"
RUN npm install && npm install -g nodemon 
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
