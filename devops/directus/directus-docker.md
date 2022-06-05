# Directus Docker

Working example with everything needed:

```yaml
version: '3'
networks:
  directus:


services:
  mysql:
    container_name: rl-headless-shop-db
    image: mariadb:10.4
    environment:
      MYSQL_ROOT_PASSWORD: retrolove
      MYSQL_DATABASE: retrolove-shop
      MYSQL_USER: retrolove
      MYSQL_PASSWORD: retrolove
    ports:
      - "9906:3306"
    networks:
      - directus
    volumes:
      - ./db:/var/lib/mysql

  directus:
    container_name: rl-headless-shop-cms
    image: directus/directus:9
    ports:
      - "8000:8055"
    environment:
      KEY: '255d861b-5ea1-5996-9aa3-922530ec40b1'
      SECRET: '6116487b-cda1-52c2-b5b5-c8022c45e263'

      DB_CLIENT: 'mysql'
      DB_HOST: 'rl-headless-shop-db'
      DB_PORT: '3306'
      DB_DATABASE: 'retrolove-shop'
      DB_USER: 'retrolove'
      DB_PASSWORD: 'retrolove'

      CACHE_ENABLED: 'false'
      # CACHE_STORE: 'redis'
      # CACHE_REDIS: 'redis://cache:6379'

      ADMIN_EMAIL: 'admin@retrolove.pl'
      ADMIN_PASSWORD: 'retrolove'

    volumes:
      - ./data/uploads:/directus/uploads
      - ./data/extensions:/directus/extensions
    networks:
      - directus
    depends_on:
      - mysql

  phpmyadmin:
    container_name: rl-shop-phpmyadmin
    image: phpmyadmin
    restart: "no"
    ports:
      - 8080:80
    environment:
      - PMA_ARBITRARY=1
      - PMA_PORT=3306
      - PMA_HOST=mysql
    networks:
      - directus
```