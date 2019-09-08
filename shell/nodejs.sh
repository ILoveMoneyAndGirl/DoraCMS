cd /root/
apt-get update
apt-get install python gcc make g++ wget
wget -P /root/ https://nodejs.org/download/rc/v8.9.1-rc.1/node-v8.9.1-rc.1.tar.gz
tar -zxvf /root/node-v8.9.1-rc.1.tar.gz -C /root/
cd /root/node-v8.9.1-rc.1/
./configure
make install
cd /root/
