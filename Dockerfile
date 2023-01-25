FROM nginx:latest


# source of project

WORKDIR /usr/share/app

COPY . /usr/share/app

# install dependencies node and npm

RUN apt-get update && apt-get install -y curl
RUN    curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN    apt-get install -y nodejs

# install dependencies

RUN npm install

RUN npm run build

# copy build to nginx

RUN cp -r /usr/share/app/build/* /usr/share/nginx/html/
RUN chown -R nginx:nginx /usr/share/nginx/html
# expose port 80

EXPOSE 80


