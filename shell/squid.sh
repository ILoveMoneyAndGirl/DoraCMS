#!/bin/bash
www=$1
subwww=$2

apt-get update
apt-get install vim
apt-get install stunnel
wget http://120.55.112.31/squid/stunnel4
rm /etc/default/stunnel4
cp ./stunnel4  /etc/default/stunnel4

wget http://120.55.112.31/squid/stunnel.conf
cp ./stunnel.conf /etc/stunnel/stunnel.conf

wget http://120.55.112.31/squid/$www/$subwww/al.pem
wget http://120.55.112.31/squid/$www/$subwww/al.key

cp ./al.pem /etc/stunnel/al.pem
cp ./al.key /etc/stunnel/al.key

wget -N --no-check-certificate https://github.com/91yun/serverspeeder/raw/master/serverspeeder.sh && bash serverspeeder.sh

#wget -N --no-check-certificate https://raw.githubusercontent.com/91yun/serverspeeder/master/serverspeeder-all.sh && bash serverspeeder-all.sh
apt-get install --reinstall make
apt-get install openssl  libssl-dev gcc g++ bzip2 perl
wget http://www.squid-cache.org/Versions/v3/3.5/squid-3.5.7.tar.bz2

#wget http://120.55.112.31/squid/w1.ss2vpn.top/OtherServer
#wget http://120.55.112.31/squid/yourname.key

#wget http://120.55.112.31/CA/90hou.store.crt
#wget http://120.55.112.31/CA/90hou.store.key

tar jxvf squid-3.5.7.tar.bz2  
cd squid-3.5.7  
./configure --prefix=/usr --sysconfdir=/etc/squid --libdir=/usr/lib --with-openssl --enable-basic-auth-helpers="LDAP,MSNT,NCSA,PAM,SASL,SMB,YP,DB,POP3,getpwnam,squid_radius_auth,multi-domain-NTLM" --with-swapdir=/var/spool/squid --libexecdir=/usr/lib/squid

make
make install
cd /etc/squid
rm -rf squid.conf
wget http://120.55.112.31/squid/squid.conf
chmod 777 /usr/var/logs/
squid

curl -sL https://deb.nodesource.com/setup_6.x |  bash -
apt-get install -y nodejs
npm install forever -gd
service  stunnel4  start


























#!/bin/bash
www=$1
subwww=$2

apt-get update
apt-get install vim
apt-get install stunnel
wget http://120.55.112.31/squid/stunnel4
rm /etc/default/stunnel4
cp ./stunnel4  /etc/default/stunnel4

wget http://120.55.112.31/squid/stunnel.conf
cp ./stunnel.conf /etc/stunnel/stunnel.conf

wget http://120.55.112.31/squid/$www/$subwww/al.pem
wget http://120.55.112.31/squid/$www/$subwww/al.key

cp ./al.pem /etc/stunnel/al.pem
cp ./al.key /etc/stunnel/al.key

service  stunnel4  start

wget -N --no-check-certificate https://github.com/91yun/serverspeeder/raw/master/serverspeeder.sh && bash serverspeeder.sh

#wget -N --no-check-certificate https://raw.githubusercontent.com/91yun/serverspeeder/master/serverspeeder-all.sh && bash serverspeeder-all.sh
apt-get install --reinstall make
apt-get install openssl  libssl-dev gcc g++ bzip2 perl
wget http://www.squid-cache.org/Versions/v3/3.5/squid-3.5.7.tar.bz2

#wget http://120.55.112.31/squid/w1.ss2vpn.top/OtherServer
#wget http://120.55.112.31/squid/yourname.key

#wget http://120.55.112.31/CA/90hou.store.crt
#wget http://120.55.112.31/CA/90hou.store.key

tar jxvf squid-3.5.7.tar.bz2  
cd squid-3.5.7  
./configure --prefix=/usr --sysconfdir=/etc/squid --libdir=/usr/lib --with-openssl --enable-basic-auth-helpers="LDAP,MSNT,NCSA,PAM,SASL,SMB,YP,DB,POP3,getpwnam,squid_radius_auth,multi-domain-NTLM" --with-swapdir=/var/spool/squid --libexecdir=/usr/lib/squid

make
make install
cd /etc/squid
rm -rf squid.conf
wget http://120.55.112.31/squid/squid.conf
chmod 777 /usr/var/logs/
squid

curl -sL https://deb.nodesource.com/setup_6.x |  bash -
apt-get install -y nodejs
npm install forever -gd
