```yaml
version: '3'
services:
  php-apache-environment:
    container_name: headless-cms
    build:
      context: ./app
      dockerfile: Dockerfile
    depends_on:
      - db
    volumes:
      - ./app/src:/var/www/html/
    ports:
      - 8000:80
  db:
    container_name: db
    image: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: MYSQL_ROOT_PASSWORD
      MYSQL_DATABASE: MYSQL_DATABASE
      MYSQL_USER: MYSQL_USER
      MYSQL_PASSWORD: MYSQL_PASSWORD
    volumes: 
      - ./db:/var/lib/mysql
    ports:
      - "9906:3306"
```

```yaml
FROM php:8.0-apache
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN apt-get update && apt-get upgrade -y
```

Structure:

```
app
    Dockerfile
    src
db
docker-compose.yml
```