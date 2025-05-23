FROM node:18-alpine as frontend_builder 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build



FROM httpd:2.4.63-alpine as backend

COPY --from=frontend_builder app/build/ /usr/local/apache2/htdocs/

COPY apache.conf/ conf/conf.d

RUN echo "Include conf/conf.d/*.conf" >> "conf/httpd.conf"

EXPOSE 80