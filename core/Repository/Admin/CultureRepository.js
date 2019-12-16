
var entityRepository = (function(){
    var db = require('../../dbConnection');
    var sql = require( "seriate" );  
    OperationResult = require('../../../helpers/operationResult');
    return{
        addEntity : function(entity, callback){
            db.execute({
                procedure : 'Culture.spGlobalView',
                params : {
                   ControlID :{
                        type: sql.INT,
                        val: parseInt(entity.ControlID)
                    },
                    ControlName :{
                        type: sql.NVARCHAR,
                        val: entity.ControlName
                    },
                    Vn :{
                        type: sql.NVARCHAR,
                        val: entity.Vn
                    },
                    Eng :{
                        type: sql.NVARCHAR,
                        val: entity.Eng
                    },
                    Description : {
                        type: sql.NVARCHAR,
                        val: entity.Description
                    },
                    Sql : {
                        type: sql.NVARCHAR,
                        val: "CREATE"
                    }
                }
            }).then(result =>{
                callback(new OperationResult(true, 'OK', 'Done',result));
            }).catch(err =>{
                callback(new OperationResult(true, 'ERR', 'Lỗi: '+ err));
            })
        },
        editEntity : function(entity, callback){
            db.execute({
                procedure : 'Culture.spGlobalView',
                params : {
                    ControlID :{
                        type: sql.INT,
                        val: parseInt(entity.ControlID)
                    },
                    ControlName :{
                        type: sql.NVARCHAR,
                        val: entity.ControlName
                    },
                    Vn :{
                        type: sql.NVARCHAR,
                        val: entity.Vn
                    },
                    Eng :{
                        type: sql.NVARCHAR,
                        val: entity.Eng
                    },
                    Description : {
                        type: sql.NVARCHAR,
                        val: entity.Description
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
                query : 'Delete FROM Culture.GlobalValue Where ControlID = @ID',
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
                query : 'SELECT * FROM Culture.GlobalValue Where ControlID = @ID',
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
                query : 'SELECT * FROM Culture.GlobalValue'
            }).then(result =>{
                 callback(new OperationResult(true, 'OK', 'Done',result));
               
            }).catch(err =>{                           
                callback(new OperationResult(true, 'ERR', 'Lỗi: '+ err));
            })
        },
        getTypeLanguage : function(lang, callback){
            if(lang ==='Vn'){
                db.execute({
                query : 'SELECT ControlID, ControlName, Vn, Description FROM Culture.GlobalValue'
            }).then(result =>{
                 callback(new OperationResult(true, 'OK', 'Done',result));
               
            }).catch(err =>{                           
                callback(new OperationResult(true, 'ERR', 'Lỗi: '+ err));
            })
        }
        else{
            db.execute({
                query : 'SELECT ControlID, ControlName, Eng, Description FROM Culture.GlobalValue'
            }).then(result =>{
                 callback(new OperationResult(true, 'OK', 'Done',result));
               
            }).catch(err =>{                           
                callback(new OperationResult(true, 'ERR', 'Lỗi: '+ err));
            })
            }
        }
    }
   
})();

module.exports = entityRepository;