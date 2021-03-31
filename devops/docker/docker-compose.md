# Docker compose

## MySQL & Node app

1. Create docker-compose.yaml below app dir

```yaml
version: "3"

services:
  mysqldb:
    image: mysql
    restart: always
    env_file: ./.env
    environment:
      MYSQL_ROOT_PASSWORD: $MYSQL_ROOT_PASSWORD
      MYSQL_DATABASE: $MYSQL_DATABASE
    ports:
      - $MYSQL_LOCAL_PORT:$MYSQL_DOCKER_PORT
    volumes:
      - db-config:/etc/mysql
      - db-data:/var/lib/mysql
      - ./db/backup/files/:/data_backup/data
  app:
    build:
      context: .
      dockerfile: ./app/Dockerfile
    image: nodejs-score-api
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
volumes:
  db-config:
  db-data:
```

2. Run `docker-compose up`.

3. If you change anything simply run `docker-compose up --build`.

4. Run non-interactrive `docker-compose up -d`.

_Notice_: You can run only one service, if you want for eg. `/usr/bin/docker-compose up -d mysqldb`.