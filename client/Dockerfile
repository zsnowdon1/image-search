FROM node:18.9

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 3000

# ENV CHOKIDAR_USEPOLLING=true
# ENV REACT_APP_CHOKIDAR_USEPOLLING=true

ENTRYPOINT [ "npm", "start" ]