FROM node:18.16.1-alpine3.17

RUN npm i -g typescript

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve 

EXPOSE 8080

CMD ["serve", "-s", "build", "-l", "8080"]