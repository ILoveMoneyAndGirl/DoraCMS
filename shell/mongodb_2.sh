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