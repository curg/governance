FROM node:14

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install

COPY . .
RUN npm run build

ENV NODE_ENV production
EXPOSE 3000
CMD [ "npm", "run", "serve" ]