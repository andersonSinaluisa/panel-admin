FROM node:14.19.0-stretch

# source of project

WORKDIR /usr/share/app

COPY . /usr/share/app
# install dependencies ngnix
RUN apt install nginx
# install dependencies

RUN npm install

RUN npm run build

# copy build to nginx

RUN cp -r /usr/share/app/build/* /usr/share/nginx/html/
RUN chown -R nginx:nginx /usr/share/nginx/html
# expose port 80

EXPOSE 80


