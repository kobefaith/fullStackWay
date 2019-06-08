#Docker
##Docker知识简介
###基本介绍
###Docker优势
更快速的交付和部署 - 容器成为了最小单位。  
更高效的虚拟化 - 内核级虚拟化  
更轻松的迁移和拓展  
更简单的管理  
###Docker基本概念
##Docker环境搭建
###Docker相关工具
Docker hub 创建repo，类似于github。  
![avatar](./img/repocreate.jpeg) 
##镜像相关操作
###镜像构建  
####1.使用docker commit命令。  
  docker commit创建镜像就跟git 提交代码变更一样。比如我们可以在ubuntu镜像中增加apache：
    
  ```
  docker pull kobefaith/ubuntu
  docker run -i -t ubuntu /bin/bash
  apt-get -y update
  apt-get install -y nodejs
  apt-get install -y npm
  ```
  我们用ubuntu的镜像启动一个容器，然后在容器中安装nodejs 和npm。我们想这个状态保持下来，在下次创建新容器的时候不需要再次安装，那么我们就需要commit 我们的工作，就像在git中一样。 
  首先执行 exit命令，退出我们当前运行的容器。然后执行 docker ps命令，找到我们刚才运行容器的id。
   
  ```
  docker ps -a
  ```    
  ![avatar](./img/ps.jpeg)  
  然后执行commit 命令提交我们的修改。 
   
  ```
  docker commit 0599f3a7899c kobefaith/ubuntu
  ```
  其中 kobefaith/ubuntu 是目标镜像仓库和镜像名
  
####2.使用docker build命令和 Dockerfile 文件。
使用Dockerfile的方式，我们需要先建立一个文件夹，然后在这个文件夹下建立一个Dockerfile文件。  

```
mkdir ./egg-docker
cd ./egg-docker
vim Dockerfile
```
然后我们在Dockerfile中写入想要执行的命令： 
 
```
FROM ubuntu:latest
MAINTAINER Kobe faith "kobefaith@163.com"
RUN apt-get -y update
RUN  apt-get install -y nodejs
RUN  apt-get install -y npm
RUN npm config set registry http://registry.npm.taobao.org/
RUN npm install egg-init -g
```
Dockerfile由一系列指令和参数组成。每条指令都必须为大写字母，后面要跟随一个参数。  Dockerfile中的指令会按照顺序从上到下执行，所以应该根据需要合理安排指令的顺序。每条指令都会创建一个新的镜像层并对镜像进行提交。  
每个Dockerfile的第一条指令都应该是FROM,FROM指令指定一个已经存在的镜像作为基础镜像。  
MAINTAINER指令指定镜像的维护者名字。  
RUN命令是在当前镜像中运行指定的命令。每一条RUN命令都会创建一个新的镜像层。  
EXPOSE指令是告诉Docker该容器内的应用程序将会使用容器的指定端口。  
Dockerfile创建成功后，我们运行 docker build 生成镜像：  

```
docker build -t="kobefaith/egg-docker:v1" .
```
-t参数指定的是 仓库的路径 冒号后面是tag。  后面的 .是指定Dockerfile的目录为当前目录，也可以改为github上的目录：
  
```
docker build -t="kobefaith/egg-docker:v1" git@github.com:kobefaith/egg-docker
``` 
build的过程如下：  
![avatar](./img/imgbuild.jpeg)   
![avatar](./img/imgbuild2.jpeg)    
以上都是基于一个已有的基础镜像，比如ubuntu 等。  
####3.从零开始：  
[从零开始构建镜像](https://docs.docker.com/engine/userguide/eng-image/baseimages/)   
主要的方式有：  
1.用tar命令。   
比如想要创建一个ubuntu的镜像，那么在你想要创建镜像相同的系统上执行命令。  

```
$ sudo debootstrap xenial xenial > /dev/null
$ sudo tar -C xenial -c . | docker import - xenial

a29c15f1bf7a

$ docker run xenial cat /etc/lsb-release

DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=16.04
DISTRIB_CODENAME=xenial
DISTRIB_DESCRIPTION="Ubuntu 16.04 LTS"
``` 
其他的脚本：  
[ubuntu 系统创建脚本](https://github.com/moby/moby/blob/master/contrib/mkimage/debootstrap)  
2.用scratch。  
scratch 是一个docker 官方提供的最小镜像。这个最小的镜像不能pull,不能run，只能在Dockerfile中引用。  

```
FROM scratch
ADD hello /
CMD ["/hello"]
```
###查看运行镜像
####获取镜像
如果我们想要运行其他人在docker hub上的镜像，可以像git一样使用pull命令来获取：

```
sudo docker pull ubuntu:12.04
```
####查看镜像的信息
使用docker image命令来查看镜像，用docker history 命令可以查看镜像的每一层的信息。  

```
docker images kobefaith/egg-docker 
```

![avatar](./img/dockerimg.jpeg)    

```
docker history 2636626a1025
```
![avatar](./img/historyimg.jpeg)  

####从镜像启动一个容器
镜像是只读的模版，需要根据镜像创建一个容器来运行。容器是从镜像创建的运行实例。二者的关系有点像面向对象语言 c++中的 类和对象的关系。 

```
docker run -d -p 80 --name static_web test/static_web nginx -g "daemon off;"
```
-d选项，告诉Docker以分离（detached）的方式在后台运行。这种方式非常适合运行类似Nginx守护进程这样的需要长时间运行的进程  
这里也指定了需要在容器中运行的命令：nginx -g "daemon off;"。这将以前台运行的方式启动Nginx，来作为我们的Web服务器。  
-p选项，控制Docker在运行时应该公开哪些网络端口给外部（宿主机）。运行一个容器时,Docker可通过两种方法在宿主机上分配端口。   
Docker可以在宿主机上通过/proc/sys/net/ipv4/ip_local_port_range文件随机一个端口映射到容器的80端口。    
可以在Docker宿主机中指定一个具体的端口号来映射到容器的80端口上。  
###管理镜像
提交镜像到docker hub  

```
docker push kobefaith/egg-docker:v1
```
![avatar](./img/dockerpush.jpeg)   
镜像导出到本地文件：
  
```
docker save -o ./egg-docker.tar kobefaith/egg-docker:v1
```
![avatar](./img/dockersave.jpeg)  
如果我们需要删除镜像，可以用rmi 命令：  

```
docker rmi kobefaith/egg-docker
```
##容器操作相关操作
###容器的启动 
启动容器有两种方式，一种是基于镜像新建一个容器并启动，另外一个是将在终止状态（stopped）的容器重新启动。
```
docker run -d -p 80 --name static_web test/static_web nginx -g "daemon off;"
```
如果我们想要个容器进行交互，可以启动一个bash终端：

```
docker run -p 7001:7001 -t -i kobefaith/egg-docker:v1
```
-t 选项让Docker分配一个伪终端（pseudo-tty）并绑定到容器的标准输入上。  
-i 则让容器的标准输入保持打开  
每个容器有一个 Container ID 和 Name，我们一般就是通过这俩来定位一个容器的

###容器的终止

```
docker stop containerid
```
###容器的重新启动

```
docker restart containerid
```
###容器的导入导出
###容器的删除

