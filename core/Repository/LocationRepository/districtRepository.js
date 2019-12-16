
var entityRepository = (function(){
    var db = require('../../dbConnection');
    var sql = require( "seriate" );  
    OperationResult = require('../../../helpers/operationResult');
    return{
        addEntity : function(entity, callback){
            db.execute({
                procedure : 'Location.spDistrict',
                params : {
                    DistrictID :{
                        type: sql.NVARCHAR,
                        val: entity.DistrictID
                    },
                    DistrictName :{
                        type: sql.NVARCHAR,
                        val: entity.DistrictName
                    },
                    EnglishName :{
                        type: sql.NVARCHAR,
                        val: entity.EnglishName
                    },
                    Level: {
                        type: sql.NVARCHAR,
                        val: entity.Level
                    },
                    ProvinceID: {
                        type: sql.NVARCHAR,
                        val: entity.ProvinceID
                    },
                    Sql : {
                        type: sql.NVARCHAR,
                        val: "Create"
                    }
                }
            }).then(result =>{
                callback(new OperationResult(true, 'OK', 'Done',result));
            }).catch(err =>{
                callback(new OperationResult(false, 'ERR', 'Lỗi: '+ err));
            })
        },
        editEntity : function(entity, callback){
            db.execute({
                procedure : 'Location.spDistrict',
                params : {
                    DistrictID :{
                        type: sql.NVARCHAR,
                        val: entity.DistrictID
                    },
                    DistrictName :{
                        type: sql.NVARCHAR,
                        val: entity.DistrictName
                    },
                    EnglishName :{
                        type: sql.NVARCHAR,
                        val: entity.EnglishName
                    },
                    Level: {
                        type: sql.NVARCHAR,
                        val: entity.Level
                    },                    
                    ProvinceID: {
                        type: sql.NVARCHAR,
                        val: entity.ProvinceID
                    },
                    Sql : {
                        type: sql.NVARCHAR,
                        val: "UPDATE"
                    }
                }
            }).then(result =>{
                 callback(new OperationResult(true, 'OK', 'Done',result));
               
            }).catch(err =>{                           
                callback(new OperationResult(false, 'ERR', 'Lỗi: '+ err));
            })
        },
        removeEntity : function(id, callback){
              db.execute({
                query : 'Delete FROM Location.vDistrict Where DistrictID = @ID',
                params :{
                    ID :{
                        type : sql.NVARCHAR,
                        val: id
                    }                    
                }
            }).then(result =>{
                 callback(new OperationResult(true, 'OK', 'Done',result));
               
            }).catch(err =>{                           
                callback(new OperationResult(false, 'ERR', 'Lỗi: '+ err));
            })
        },
        getById : function(id, callback){
            db.execute({
                query : 'SELECT * FROM Location.vDistrict Where DistrictID = @ID',
                params :{
                    ID :{
                        type : sql.NVARCHAR,
                        val: id
                    }                    
                }
            }).then(result =>{
                 callback(new OperationResult(true, 'OK', 'Done',result));
               
            }).catch(err =>{                           
                callback(new OperationResult(false, 'ERR', 'Lỗi: '+ err));
            })
        },
        getAllEntity : function(callback){
            db.execute({
                query : 'SELECT * FROM Location.vDistrict'
            }).then(result =>{
                 callback(new OperationResult(true, 'OK', 'Done',result));
               
            }).catch(err =>{                           
                callback(new OperationResult(false, 'ERR', 'Lỗi: '+ err));
            })
        },
        getByServerSide : function(entity, callback){
            db.execute({
                procedure : 'Location.spDistrictServerSide',
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
                        val:  entity.search.value
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