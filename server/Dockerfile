FROM node:16

WORKDIR /build

COPY ./package.json .
RUN npm cache clean --force
RUN npm install
COPY . .

EXPOSE 3001

# CMD npm start
CMD [ "npm", "start" ]