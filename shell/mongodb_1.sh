cd /root/

sudo apt-get  update
#mongodb 所需库

wget -P /root/ https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1604-4.0.10.tgz
tar -zxvf /root/mongodb-linux-x86_64-ubuntu1604-4.0.10.tgz -C /root/
mv /root/mongodb-linux-x86_64-ubuntu1604-4.0.10/ /usr/local/mongodb

mkdir -p /usr/local/mongodb/data
mkdir -p /usr/local/mongodb/log

sudo apt-get install libcurl4-openssl-dev


/usr/local/mongodb/bin/mongod -dbpath=/usr/local/mongodb/data -logpath=/usr/local/mongodb/log/mongodb.log -fork

#/usr/local/mongodb/bin/mongorestore -h 127.0.0.1:27017 -d WebBackUserDB --drop /root/initDBData/baseData
