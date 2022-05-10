FROM node:11-alpine

RUN mkdir -p /src

WORKDIR /src

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
