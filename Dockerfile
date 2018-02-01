FROM nginx:alpine

COPY dist /usr/share/nginx/html
COPY bin/run-nginx /run-nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY certs /etc/ssl/certs

WORKDIR /usr/share/nginx/html

CMD ["/run-nginx"]
