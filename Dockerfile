FROM node:14

WORKDIR src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY ./ ./

# Add bash
# RUN apk add --no-cache bash

EXPOSE 1337

CMD ["node", "src/app.js"]