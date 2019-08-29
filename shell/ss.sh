//---------SS SerVer----->///////////////*****************************

(linode 56)

yum install wget

# wget -N --no-check-certificate https://raw.githubusercontent.com/91yun/serverspeeder/master/serverspeeder-all.sh && bash serverspeeder-all.sh

wget -N --no-check-certificate https://github.com/91yun/serverspeeder/raw/master/serverspeeder.sh && bash serverspeeder.sh

curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py

pip install shadowsocks

vi /etc/shadowsocks.json

 {
    "server":"0.0.0.0",
    "server_port":50013,
    "local_port":1080,
    "password":"1234567890",
    "timeout":600,
    "method":"aes-256-cfb"
}

vi /etc/systemd/system/shadowsocks.service

[Unit]
Description=Shadowsocks
[Service]
TimeoutStartSec=0
ExecStart=/usr/bin/ssserver -c /etc/shadowsocks.json
[Install]
WantedBy=multi-user.target


systemctl enable shadowsocks
systemctl start shadowsocks
systemctl status shadowsocks
 /sbin/iptables -I INPUT -p tcp --dport 50013 -j ACCEPT

 /sbin/iptables -I INPUT -p tcp --dport 30029 -j ACCEPT
//---------SS SerVer----->////////***********************