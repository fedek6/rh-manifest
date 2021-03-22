# Commands

## Stop using id

```
docker stop 4640b9bd9621
```

## Run with exposed port

```
docker run -p 49160:3000 -d fedek6/node-score-api
```

Interactive:

```
docker run -it -p 80:80 nginx
```

## List containers (get id)

```
docker ps
```

## List images

```
docker images -a
```

## Remove everything

```
docker system prune -a
```

## Remove container

```bash
docker rm [CONTAINER_ID]
```

## Remove image

```bash
docker images rm [IMAGE_ID]
```

## Run command in docker image

```bash
docker exec -it [CONTAINER_ID] bash
```

