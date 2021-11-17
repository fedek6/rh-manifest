# Node TSC app

```yaml
version: "3"

services:
  mysqldb:
    image: mysql
    container_name: node-score-api-db
    command: 
      - '--secure-file-priv=NULL'
    restart: always
    env_file: ./.env
    environment:
      MYSQL_ROOT_PASSWORD: $MYSQL_ROOT_PASSWORD
      MYSQL_DATABASE: $MYSQL_DATABASE
    ports:
      - $MYSQL_LOCAL_PORT:$MYSQL_DOCKER_PORT
    volumes:
      - ./data/etc/mysql/:/etc/mysql:rw
      - ./data/var/lib/mysql:/var/lib/mysql:rw
      - ./data/db/backup/files/:/data_backup/data:rw
      - ./schema:/docker-entrypoint-initdb.d:ro
  app:
    build:
      context: .
      dockerfile: ./app/Dockerfile
    image: node-score-api
    container_name: node-score-api-app
    env_file: ./.env
    ports:
      - $NODE_LOCAL_PORT:$NODE_DOCKER_PORT
    volumes: 
      - ./app:/app
      - /app/node_modules
    depends_on:
      - mysqldb
    stdin_open: false
    tty: false
```

```Dockerfile
FROM node:15
# Create app directory
WORKDIR /usr/src/app
# ENV
ENV NODE_ENV production
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY /app/package*.json ./
RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY /app/. .
RUN yarn tsc


CMD [ "node", "dist/app.js" ]
EXPOSE 3000
```