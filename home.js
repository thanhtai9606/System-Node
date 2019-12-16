var sql = require("seriate");

// Change the config settings to match your 
// SQL Server and database
var config = {  
    "server": "127.0.0.1",
    "user": "sa",
    "password": "DungMy@#96",
    "database": "ERPDatabase",
    "pool": {
        "max": 5,
        "min": 1,
        "idleTimeoutMillis": 2000
    }
};

sql.setDefaultConfig( config );

sql.execute( {  
        procedure : 'demo',
        params :{
           Id :{
                type : sql.NVARCHAR,
                val :'11'
            },
        Result:{
            type : sql.NVARCHAR,
            val : 'xxx'
        }
        }
        //query: "SELECT * FROM Location.sp"
    } ).then( function( results ) {
        console.log( results );
        var a = results[Array[1],0][0];
    }, function( err ) {
        console.log( "Something bad happened:", err );
    } );