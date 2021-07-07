FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install nodemon --save

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]

