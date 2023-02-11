FROM node:16-alpine as builder
WORKDIR /usr/app
COPY . .
RUN yarn
RUN yarn build

FROM nginx:stable-alpine
COPY --from=builder /usr/app/configs/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/out /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
