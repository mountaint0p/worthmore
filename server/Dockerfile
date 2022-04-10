FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install nodemon

COPY . .

ENV PORT = 5000

EXPOSE 5000


CMD ["node", "index.js"]



