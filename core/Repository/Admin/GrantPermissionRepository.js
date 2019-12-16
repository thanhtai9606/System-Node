
var entityRepository = (function(){
    var db = require('../../dbConnection');
    var sql = require( "seriate" );  
    OperationResult = require('../../../helpers/operationResult');
    //var operationResult = new 
    return{
        addEntity : function(entity, callback){
            db.execute({
                procedure : 'Location.spProvince',
                params : {
                    ProvinceID :{
                        type: sql.NVARCHAR,
                        val: entity.ProvinceID
                    },
                    ProvinceName :{
                        type: sql.NVARCHAR,
                        val: entity.ProvinceName
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
                        val: "Create"
                    }
                }
            }).then(result =>{
                callback(new OperationResult(true, 'OK', 'Done',result));
            }).catch(err =>{
                callback(new OperationResult(true, 'ERR', 'Lỗi: '+ err, result));
            })
        },
        editEntity : function(entity, callback){
            db.execute({
                procedure : 'Location.spProvince',
                params : {
                    ProvinceID :{
                        type: sql.NVARCHAR,
                        val: entity.ProvinceID
                    },
                    ProvinceName :{
                        type: sql.NVARCHAR,
                        val: entity.ProvinceName
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
                        val: "Edit"
                    }
                }
            }).then(result =>{
                 callback(new OperationResult(true, 'OK', 'Done',result));
               
            }).catch(err =>{                           
                callback(new OperationResult(true, 'ERR', 'Lỗi: '+ err, result));
            })
        },
        removeEntity : function(id, callback){
              db.execute({
                query : 'Delete FROM Location.vProvince Where ProvinceID = @ID',
                params :{
                    ID :{
                        type : sql.NVARCHAR,
                        val: id
                    }                    
                }
            }).then(result =>{
                 callback(new OperationResult(true, 'OK', 'Done',result));
               
            }).catch(err =>{                           
                callback(new OperationResult(true, 'ERR', 'Lỗi: '+ err, result));
            })
        },
        getById : function(id, callback){
            db.execute({
                query : 'SELECT * FROM Location.vProvince Where ProvinceID = @ID',
                params :{
                    ID :{
                        type : sql.NVARCHAR,
                        val: id
                    }                    
                }
            }).then(result =>{
                 callback(new OperationResult(true, 'OK', 'Done',result));
               
            }).catch(err =>{                           
                callback(new OperationResult(true, 'ERR', 'Lỗi: '+ err, result));
            })
        },
        getAllEntity : function(callback){
            db.execute({
                query : 'SELECT * FROM Location.vProvince'
            }).then(result =>{
                 callback(new OperationResult(true, 'OK', 'Done',result));
               
            }).catch(err =>{                           
                callback(new OperationResult(true, 'ERR', 'Lỗi: '+ err, result));
            })
        },
        validateLogin : function(entity, callback){
            db.execute({
                procedure : 'HumanResources.spLogin',
                params :{
                    EmpCode : {
                        type:sql.NVARCHAR,
                        val : entity.EmpCode
                    },
                    Password : {
                        type : sql.NVARCHAR,
                        val : entity.Password
                    }
                }
            }).then(result =>{
               // console.log(JSON.stringify(result));
               var data = result[Array[1],0][0];
                callback(new OperationResult(true, 'OK', 'Done', data));
                //callback(result);
            }).catch(err =>{
                callback(new OperationResult(true, 'ERR', 'Lỗi: '+ err));
            })
        }
    }
   
})();

module.exports = entityRepository;