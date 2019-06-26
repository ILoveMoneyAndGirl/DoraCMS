sudo apt-get  update
#mongodb 所需库

wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1604-4.0.10.tgz
tar -zxvf mongodb-linux-x86_64-ubuntu1604-4.0.10.tgz
mv mongodb-linux-x86_64-ubuntu1604-4.0.10/ /usr/local/mongodb

mkdir -p /usr/local/mongodb/data
mkdir -p /usr/local/mongodb/log

sudo apt-get install libcurl4-openssl-dev


/usr/local/mongodb/bin/mongod -dbpath=/usr/local/mongodb/data -logpath=/usr/local/mongodb/log/mongodb.log -fork