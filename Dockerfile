FROM nginx:alpine

# copy your website into nginx server
COPY . /usr/share/nginx/html

EXPOSE 80