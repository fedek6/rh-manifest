# Dockerize Node app

Create config files:

```bash
touch Dockerfile
```

```Dockerfile
FROM node:15
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .
RUN yarn tsc


CMD [ "node", "dist/app.js" ]
EXPOSE 3000
```

Docker ignore:
```.dockerignore
node_modules
npm-debug.log
```

## Build 

```bash
docker build -t fedek6/node-score-api .
```

## List & run

Public port -> container port.

```bash
docker images
docker run -p 49160:3000 -d fedek6/node-score-api
```

Check port:

```bash
nmap localhost
```

Will output: 

```
49160/tcp open  unknown
```

## Get id

```bash
docker ps
```

## Get logs

This will give you container's output:

```bash
docker logs 
```

## Enter the container

```bash
docker exec -it <container id> /bin/bash
```