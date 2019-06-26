#重启
cd /root/

/usr/local/mongodb/bin/mongod -shutdown  -dbpath=/usr/local/mongodb/data

# /usr/local/mongodb/bin/mongod -dbpath=/usr/local/mongodb/data -logpath=/usr/local/mongodb/log/mongodb.log -fork -auth -bind_ip=0.0.0.0 


/usr/local/mongodb/bin/mongod -dbpath=/usr/local/mongodb/data -logpath=/usr/local/mongodb/log/mongodb.log -fork -auth -bind_ip=0.0.0.0 &

#开启端口
iptables -I INPUT -p tcp --dport 27017 -j ACCEPT
iptables -I INPUT -p udp --dport 27017 -j ACCEPT
iptables-save