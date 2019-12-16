
var entityRepository = (function(){
    var db = require('../../dbConnection');
    var sql = require( "seriate" );  
    OperationResult = require('../../../helpers/operationResult');
    //var operationResult = new 
    return{
        addEntity : function(entity, callback){
            db.execute({
                procedure : 'Location.spWard',
                params : {
                    WardID :{
                        type: sql.NVARCHAR,
                        val: entity.WardID
                    },
                    WardName :{
                        type: sql.NVARCHAR,
                        val: entity.WardName
                    },
                    EnglishName :{
                        type: sql.NVARCHAR,
                        val: entity.EnglishName
                    },
                    Level: {
                        type: sql.NVARCHAR,
                        val: entity.Level
                    },
                    DistrictID: {
                        type: sql.NVARCHAR,
                        val: entity.DisitrictID
                    },
                    Sql : {
                        type: sql.NVARCHAR,
                        val: "Create"
                    }
                }
            }).then(result =>{
                //callback({Sucess : true, Caption: "OK", Message: 'Finished', data: result })
                callback(new OperationResult(true, 'OK', 'Done',result));
            }).catch(err =>{
                callback(new OperationResult(true, 'ERR', 'Lỗi: '+ err));
            })
        },
        editEntity : function(entity, callback){
            db.execute({
                procedure : 'Location.spWard',
                params : {
                    WardID :{
                        type: sql.NVARCHAR,
                        val: entity.WardID
                    },
                    WardName :{
                        type: sql.NVARCHAR,
                        val: entity.WardName
                    },
                    EnglishName :{
                        type: sql.NVARCHAR,
                        val: entity.EnglishName
                    },
                    Level: {
                        type: sql.NVARCHAR,
                        val: entity.Level
                    },
                    Sql : {
                        type: sql.NVARCHAR,
                        val: "UPDATE"
                    }
                }
            }).then(result =>{
                 callback(new OperationResult(true, 'OK', 'Done',result));
               
            }).catch(err =>{                           
                callback(new OperationResult(true, 'ERR', 'Lỗi: '+ err));
            })
        },
        removeEntity : function(id, callback){
              db.execute({
                query : 'Delete FROM Location.vWard Where WardID = @ID',
                params :{
                    ID :{
                        type : sql.NVARCHAR,
                        val: id
                    }                    
                }
            }).then(result =>{
                 callback(new OperationResult(true, 'OK', 'Done',result));
               
            }).catch(err =>{                           
                callback(new OperationResult(true, 'ERR', 'Lỗi: '+ err));
            })
        },
        getById : function(id, callback){
            db.execute({
                query : 'SELECT * FROM Location.vWard Where WardID = @ID',
                params :{
                    ID :{
                        type : sql.NVARCHAR,
                        val: id
                    }                    
                }
            }).then(result =>{
                 callback(new OperationResult(true, 'OK', 'Done',result));
               
            }).catch(err =>{                           
                callback(new OperationResult(true, 'ERR', 'Lỗi: '+ err));
            })
        },
        getAllEntity : function(callback){
            db.execute({
                query : 'SELECT * FROM Location.vWard'
            }).then(result =>{
                 callback(new OperationResult(true, 'OK', 'Done',result));
               
            }).catch(err =>{                           
                callback(new OperationResult(true, 'ERR', 'Lỗi: '+ err));
            })
        },
        getByServerSide : function(entity, callback){
            db.execute({
                procedure : 'Location.spWardServerSide',
                params : {
                   DisplayLength :{
                        type: sql.INT,
                        val: parseInt(entity.length)
                    },
                    DisplayStart :{
                        type: sql.INT,
                        val: parseInt(entity.start)
                    },
                    SortCol :{
                        type: sql.INT,
                        val: parseInt(entity.order[0].column)
                    },
                    SortDir: {
                        type: sql.NVARCHAR,
                        val: entity.order[0].dir
                    },
                    Search : {
                        type: sql.NVARCHAR,
                        val: entity.search.value
                    }
                }
            }).then(result =>{
                callback(new OperationResult(true, 'OK', 'Done',result));
            }).catch(err =>{
                callback(new OperationResult(false, 'ERR', 'Lỗi: '+ err));
            })
        }
    }
})();

module.exports = entityRepository;