FROM node:11-alpine
WORKDIR /src
COPY package.json package-lock.json ./

RUN npm install
WORKDIR /src/app
COPY . .

CMD ["npm", "start"]
