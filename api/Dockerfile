FROM node:14

WORKDIR /src
COPY package.json .
RUN npm install
RUN npm install ts-node
COPY . .
CMD npm run build