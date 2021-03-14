# Docker on Elementary OS

```bash
sudo apt-get update
sudo apt-get install software-properties-common
sudo apt-get install \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg-agent \
  software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
  	"deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   	bionic \
   	stable"
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose
```