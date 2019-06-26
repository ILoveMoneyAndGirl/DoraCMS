#数据库服务器安装
#版本：Ubuntu 16.04 LTS--->（linode）



sudo apt-get  update
#mongodb 所需库

wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1604-4.0.10.tgz
tar -zxvf mongodb-linux-x86_64-ubuntu1604-4.0.10.tgz
mv mongodb-linux-x86_64-ubuntu1604-4.0.10/ /usr/local/mongodb

mkdir -p /usr/local/mongodb/data
mkdir -p /usr/local/mongodb/log

sudo apt-get install libcurl4-openssl-dev


/usr/local/mongodb/bin/mongod -dbpath=/usr/local/mongodb/data -logpath=/usr/local/mongodb/log/mongodb.log -fork

#********数据库创建账号
/usr/local/mongodb/bin/mongo

use admin
db.createUser({user: "root",pwd: "wayz10xs.c.c",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})

use WebBackUserDB
db.createUser( { user: "RootUser", pwd: "WebBackUserDB_Root.c.c", roles: [ { role: "readWrite", db: "WebBackUserDB" }, ] } )

# use WebBackUserDB
# db.createUser( { user: "RootUser", pwd: "WebBackUserDB_Root.c.c", roles: [ { role: "readWrite", db: "WebBackUserDB" }, ] } )


exit
#**********end

#重启
/usr/local/mongodb/bin/mongod -shutdown  -dbpath=/usr/local/mongodb/data

# /usr/local/mongodb/bin/mongod -dbpath=/usr/local/mongodb/data -logpath=/usr/local/mongodb/log/mongodb.log -fork -auth -bind_ip=0.0.0.0 


/usr/local/mongodb/bin/mongod -dbpath=/usr/local/mongodb/data -logpath=/usr/local/mongodb/log/mongodb.log -fork -auth -bind_ip=0.0.0.0 &

#开启端口
iptables -I INPUT -p tcp --dport 27017 -j ACCEPT
iptables -I INPUT -p udp --dport 27017 -j ACCEPT
iptables-save


# export PATH=/usr/local/mongodb/bin:$PATH
# bind_ip=0.0.0.0
# dbpath=/usr/local/mongodb/data/  #数据存放路径
# logpath=/usr/local/mongodb/log/mongodb.log #日志存放路径
# auth=true
# fork=true
# ./bin/mongod --config /usr/local/mongodb/mongodb.conf
# netstat -ap | grep 27017