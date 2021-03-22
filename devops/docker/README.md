# Docker basics

## Images

A Docker image is containing everything needed to run an application as a container. This includes:

* code
* runtime
* libraries
* environment variables
* configuration files

The image can then be deployed to any Docker environment and executable as a container.

You can find actual images [here](https://hub.docker.com/search?image_filter=official&type=image).

## Containers

A Docker container is a runtime instance of an image. From one image you can create multiple containers (all running the sample application) on multiple Docker platform.

A container runs as a discrete process on the host machine. Because the container runs without the need to boot up a guest operating system it is lightweight and limits the resources (e.g. memory) which are needed to let it run.