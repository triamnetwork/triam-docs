# INSTALL

## Dependencies
 > OS
 
  - ubuntu version >= 16.04

## Postgres

- Setup PostgresSQL by following those step:
```` 
    sudo apt update
    sudo apt install postgresql postgresql-contrib
````    
- Then setting password for postgres user:
````
    sudo -u postgres psql postgres
    \password postgres
    Enter the password
    \q to close psql
````
- Setting "pg_hba.conf" file to allowing local connections
    + As a super user, open: 
    
    `/etc/postgresql/<version of postgres>/main/pg_hba.conf`
    + Scroll down to the line that describes local socket connections. Change this lines:
    
    `local all all peer -> local all all md5`
    + Save and close the file
    + Restart the postgres service:
     
     `sudo service postgresql restart`    
- Creating DB for Core

````
    sudo su postgres
    createdb core
````
     
## Install docker

- [Install docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-0) 
  - [Setup user command docker without sudo](https://askubuntu.com/questions/477551/how-can-i-use-docker-without-sudo)
- Enable docker engine API
    - Docker running daemon under systemd with file config: 
    `/lib/systemd/system/docker.service` (It'll difference with another OS or setting up).
    - At line starts with `ExecStart=` add ` -H tcp://0.0.0.0:<port_number>` 
        - `0.0.0.0` is public for all IP, recommend is `127.0.0.1` for only node access isolate.
    - Reload docker daemon: `sudo systemctl daemon-reload`.
    - Restart docker service: `sudo systemctl restart docker`
    - Checking API: `curl -v http://<ip_address>:<port_number>/containers/json?all=1`
 
- Install TriamVM:
    
    - Create folder to mount volume with docker container:
        ````
        cd /home/$USER
        mkdir vol
        ```` 
    - Pull image from docker hub:
        `docker pull triamnetwok/triamvm:lastest`
    - Run image with name is `triam` ,with command:
    
    `docker run --add-host="triamvm.docker:myip" --name triam -d -e PORT=11626 HOST="triamvm.docker" -it -v "/home/$USER/vol:/workdir/app/" triamnetwork/triamvm tail -f /dev/null/`
    
    - Check docker with name is `triam` already running:
    
    `docker inspect triam`

## Running Triam Core

> Download latest stable release
 
    
  - [link download latest stable release](#) 
  - Recommend for user when running core
  
> Install from source
   - Following those step to build Core:
   ````
   sudo apt-get install software-properties-common
   sudo add-apt-repository ppa:ubuntu-toolchain-r/test
   sudo apt-get update
   sudo apt-get install git build-essential pkg-config autoconf automake libtool bison flex libpq-dev clang++-5.0 gcc-5 g++-5 cpp-5
   sudo apt-get install libcurl4 libcurl4-openssl-dev -y
   git clone git@gitlab-new.bap.jp:arm/triam-sc-core.git
   cd triam-sc-core
   git checkout <lastest branch>
   git submodule init
   git submodule update
   sudo apt install pandoc
   ./autogen.sh
   ./configure (If configure complains about compiler versions, try CXX=clang-5.0 ./configure or CXX=g++-5 ./configure or similar, depending on your compiler.)
   make or make -j (for aggressive parallel build)
   make check to run tests.
   make install to install.
   ````
> Start triam core

````
cd /<triam core directory>/src
+Run this command for the first time to initiating new db:
    ./stellar-core --conf <config file(*.cfg)> --newdb
    ./stellar-core --conf <config file(*.cfg)> --newhist local
+Run this command if the node Core is first time of the root node or when can not recover the state of Blockchain:
./stellar-core --conf <config file(*.cfg)> --forcescp
+Run stellar core by pm2 package: 
pm2 start ./stellar-core --interpreter none -x -- --conf <config file(*.cfg)>
````   
 - *Don't forget upgrade version 10 for triam core to apply new code*.
 - Config file: [config.cfg](/install/coreConfig)
 
## Running horizon:

> Download latest stable release
   - [link download latest stable release](#) 
   
> Build from source
   
   - Install Go:
   ````
   sudo apt-get update
   sudo apt-get -y update
   sudo curl -O https://storage.googleapis.com/golang/go1.9.1.linux-amd64.tar.gz
   sudo nano/vim/vi ~/.profile
   At the end of file, add this line 
   "export PATH=$PATH:/usr/local/go/bin"
   source ~/.profile
   ````
   - Install dependencies.
   ````
   mkdir ${HOME}/go
   cd ${HOME}/go
   mkdir bin && mkdir src
   export GOPATH=${HOME}/go
   curl https://raw.githubusercontent.com/golang/dep/master/install.sh | sh
   cd $GOPATH/bin
   sudo cp dep /usr/bin
   sudo apt-get install mercurial
   sudo apt install build-essential
   ````
   - Download source and build horizon api
   ````
   env GIT_TERMINAL_PROMPT=1 go get gitlab-new.bap.jp/arm/triam-sc-horizon
   cd $GOPATH/src/gitlab-new.bap.jp/arm/triam-sc-horizon
   git checkout <current version>
   dep ensure -v
   go install gitlab-new.bap.jp/arm/triam-sc-horizon/services/horizon
   cd $GOPATH/bin
   sudo cp horizon ${HOME}/<version>
   ````

> Start horizon

````
  cd ${HOME}/<version>
  touch horizon.conf or copy from exists source
  source horizon.conf
  ./horizon db init
  ./horizon db reap
  pm2 start ./horizon --interpreter none -x
````
   





       

       
       

   
        
