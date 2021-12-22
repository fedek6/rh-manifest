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

To get all (even not running):

```
docker container ls --all
```

## List images

```
docker images -a
```

## Remove all images

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

## Remove all volumes

```bash
docker volume prune
```

## Remove everything forcibly

```bash
docker system prune --volumes
```

## Run command in docker image

```bash
docker exec -it [CONTAINER_ID] bash
```

## Networking

1. Execute `docker network ls` to see how many bridge drivers you have. In my case I had 2 and containers where using different ones
2. If you have multiple bridge drivers, make sure that you're starting your containers, which will be talking with each other, using same bridge network docker `run -d -t --network networkname  --name containername`
3. Run `docker network inspect networkname`. You will see details of network with list of containers. Each container will have IPv4Address associated with it. Use value of these address to communicate instead of localhost or 127.0.0.1

## How to check where volumes are stored?

```bash
docker volume ls
docker inspect {volume name}
```

## Disable autostart

```bash
docker update --restart=no [CONTAINER_ID]
```