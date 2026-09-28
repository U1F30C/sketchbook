# to know the right version use
# cat /etc/os-release
# node --version

FROM node:14-buster as build
WORKDIR /app
COPY . ./

RUN npm i

CMD ls
