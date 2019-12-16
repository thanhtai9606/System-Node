var express = require('express');
var router = express();
var unitOfWork = require('../core/UnitOfWork');

router.get('/', function(req,res, next){
    res.render('Admin/login',{title :'Login Page'})
})
router.post('/ValidateLogin/', function(req, res, next){    
    var entity = req.body;
    unitOfWork.grantPermissionRepository().validateLogin(entity, function(result){
        if(result.Success = false)
             res.json({statusCode : 400, status :result.Caption, Mesasge : result.Message})
           else{
                if(result.Data.length ==1)     
                {                   
                    req.session.currentUser = result.Data[0];
                    res.json({statusCode : 200, status: 'Đăng nhập thành công!'})                    
                }                   
                else
                    res.json({statusCode : 400, status: 'Mã nhân viên hoặc mật khẩu không đúng!'})  
           }    
                       
    })
});
/**
 * List all Entities
 */
router.get('/getAllEntities', function(req, res, next){
    unitOfWork.provinceRepository().getAllEntity(function(err, data){
        if(err)
            res.json(err)
        res.json(data);
    })
})

router.post('/addEntity/:entity', function(req, res,next){
    var entity = req.body.params
   
    unitOfWork.provinceRepository().addEntity(entity,function(err, data){
        if(err)
            res.json(err)
        res.json(data);
    })
})
/**
 * GetById an Entity
 */
router.get('/getById/:id', function(req, res, next){
    var id = req.params.id;
    unitOfWork.provinceRepository().getById(id,function(err, data){
        if(err)
            res.json(err)
        res.json(data);
    })
})
/**
 * Delete an entity
 */
router.post('/removeById/:id', function(req, res, next){
   var id = req.params.id;
    unitOfWork.provinceRepository().removeEntity(id,function(err, data){
        if(err)
            res.json(err)
        res.json(data);
    })
})


module.exports = router;