apt-get update
apt-get install python gcc make g++ wget
wget https://nodejs.org/download/rc/v8.9.1-rc.1/node-v8.9.1-rc.1.tar.gz
tar -zxvf node-v8.9.1-rc.1.tar.gz 
cd node-v8.9.1-rc.1.tar.gz 
./configure
make install