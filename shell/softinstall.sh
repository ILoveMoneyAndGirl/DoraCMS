#数据库服务器安装
#版本：Ubuntu 16.04 LTS--->（linode）
 sudo apt-get update
 sudo apt-get install mysql-server #输入密码(wayz10xs.c.c)
sudo apt-get install mysql-client
sudo apt-get install libmysqlclient-dev
#命令行进入数据库 mysql -u root -p  
#create user "connectUser"@"%" identified by "connectUser.c.c"
# grant all on *.* to connectUser@'%';
#flush privileges;刷新权限
# sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
# 将bind-address = 127.0.0.1注释掉（即在行首加#）
# 启动mysql：
# 方式一：sudo /etc/init.d/mysql start 
# 方式二：sudo service mysql start

# 停止mysql：
# 方式一：sudo /etc/init.d/mysql stop 
# 方式二：sudo service mysql stop

# 重启mysql：
# 方式一：sudo/etc/init.d/mysql restart
# 方式二：sudo service mysql restart


# mac 端口查看
# lsof -i:8888

# sudo apt-get install mongodb
# service mongodb start
# service mongodb stop
# sudo apt-get install locate
# 查看mongodb是否启动
# pgrep mongo -l 

sudo apt-get install update
sudo apt-get install libcurl4-openssl-dev

wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1604-4.0.10.tgz
tar -zxvf mongodb-linux-x86_64-ubuntu1604-4.0.10.tgz

 mv mongodb-linux-x86_64-ubuntu1604-4.0.10/ /usr/local/mongodb
 export PATH=/usr/local/mongodb/bin:$PATH
 mkdir -p /data/db

bind_ip=0.0.0.0
dbpath=/usr/local/mongodb/data/  #数据存放路径
logpath=/usr/local/mongodb/log/mongodb.log #日志存放路径
auth=true
fork=true

./bin/mongod --config /usr/local/mongodb/mongodb.conf

# netstat -ap | grep 27017
./bin/mongod -dbpath=/usr/local/mongodb/data -logpath=/usr/local/mongodb/log/mongodb.log -fork

use admin

db.createUser({user: "root",pwd: "wayz10xs.c.c",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})

use vpndb
db.createUser( { user: "serverUser", pwd: "vpn.c.c", roles: [ { role: "readWrite", db: "vpndb" }, ] } )

./bin/mongod -shutdown  -dbpath=/usr/local/mongodb/data

 ./bin/mongod -dbpath=/usr/local/mongodb/data -logpath=/usr/local/mongodb/log/mongodb.log -fork -auth -bind_ip=0.0.0.0
