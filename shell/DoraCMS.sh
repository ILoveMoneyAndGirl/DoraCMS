# apt-get update
# apt-get install python gcc make g++ wget
# wget https://nodejs.org/download/rc/v8.9.1-rc.1/node-v8.9.1-rc.1.tar.gz
# tar -zxvf node-v8.9.1-rc.1.tar.gz 
# cd node-v8.9.1-rc.1.tar.gz 
# ./configure
# make install


# use WebBackUserDB
# db.createUser( { user: "RootUser", pwd: "WebBackUserDB_Root.c.c", roles: [ { role: "readWrite", db: "WebBackUserDB" }, ] } )

# wget https://www.html-js.cn/upload/file/ueditor/1131952285434384384.zip



#上传工程

cd /root/DoraCMS/

# rm -rf node_modules
# rm package-lock.json
# npm cache clear --force
npm install


/usr/local/mongodb/bin/mongorestore  -h 127.0.0.1:27017 -d WebBackUserDB --drop /root/DoraCMS/baseData

sudo apt-get install redis-server

npm install pm2 -g

pm2 start server.js --name doracms
cd /root/



# 我们通过（http://localhost:8080/dr-admin）访问后台，登录信息 doramart/123456 . doramart用户具有超级管理员权限。
