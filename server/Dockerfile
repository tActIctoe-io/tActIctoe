FROM node:14

WORKDIR /build

COPY ./package.json .
RUN npm cache clean --force
RUN npm install
COPY . .

EXPOSE 3001

# CMD npm start
CMD [ "node", "server.js" ]