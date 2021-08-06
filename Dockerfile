FROM node:16-buster

WORKDIR /usr/src/app

RUN apt-get update && apt-get -y upgrade

COPY . .

# 1. Create image:      docker build -t back-3 .
# 2. Rodar o container: docker run --rm -it --name meu-container -v $(pwd):/usr/src/app back-3 bash
