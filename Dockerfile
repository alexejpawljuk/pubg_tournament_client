FROM node:18.16.1-alpine3.17

RUN npm i -g typescript

WORKDIR /client/

COPY ./ /client/

#ENV SERVER_PORT=8080

EXPOSE 8080

CMD ["npm", "start"]
#CMD npm run build && npm install -g serve && serve -s build