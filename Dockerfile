FROM node:21.5

WORKDIR /app

COPY package.json package-lock.json ./

ENV NODE_ENV=development

RUN npm install

CMD [ "npm", "start" ]