#FROM node:18.16.1-alpine3.17
#
#RUN npm i -g typescript
#
#COPY ./ /opt/client/
#
##ENV SERVER_PORT=8080
#
#WORKDIR /opt/client/
#
#CMD npm run build && npm install -g serve && serve -s build