var sql = require("seriate");

// Change the config settings to match your 
// SQL Server and database
var config = {  
    "server": "127.0.0.1",
    "user": "sa",
    "password": "DungMy@#96",
    "database": "ERPDatabase",
    "pool": {
		"max": 10,
		"min": 4,
		"idleTimeoutMillis": 3000
	}
};

sql.setDefaultConfig( config );

module.exports = sql;