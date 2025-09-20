FROM node:20.11.1-alpine

WORKDIR /usr/app

COPY package.json ./
RUN npm install

COPY ./src/ ./src/
COPY ./tsconfig.json ./tsconfig.json
COPY ./tsconfig.prod.json ./tsconfig.prod.json

RUN npm run build

CMD ["node", "dist/main.js"]
