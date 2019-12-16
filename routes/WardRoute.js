var express = require('express');
var router = express();
var unitOfWork = require('../core/UnitOfWork');

router.get('/', function(req,res, next){
    var currentUser = req.session.currentUser;
    if(currentUser ==null)
        res.redirect('/Admin'); //redirect if session is null
    res.render('Location/Ward.ejs', { Title: 'Ward Page ', FullName : currentUser.FirstName, Avatar : currentUser.Avatar });
})
/**
 * Get Data ServerSide
 */
router.post('/getDataServerSide', function(req, res, next){
    var entity = req.body;
     unitOfWork.wardRepository().getByServerSide(entity,function(result){
       if(result.Success = true)
       {
            res.json(result.Data[0][0])
       }else{
            res.json(result);
       }        
    })
})
/**
 * List all Entities
 */
router.get('/getAllEntities', function(req, res, next){
    unitOfWork.wardRepository().getAllEntity(function(result){
        if(result.Success){
            res.json(result.Data)
        }            
        else{
            res.json(result);
        }        
    })
})
/**
 * update Entities
 */
router.post('/editEntity/', function(req, res,next){
    var entity = req.body
    unitOfWork.wardRepository().editEntity(entity,function(result){
         if(result.Success == false){
            res.json({statusCode : 400, status : result.Message, Caption : result.Caption})
         }             
           else{
                res.json({statusCode : 200, status : result.Message, Caption : result.Caption})                 
           }    
    })
})
/**
 * Add new Entities
 */
router.post('/addEntity/', function(req, res,next){
    var entity = req.body
    unitOfWork.wardRepository().addEntity(entity,function(result){
        if(result.Success == false){
            res.json({statusCode : 400, status : result.Message, Caption : result.Caption})
        }             
        else{
                res.json({statusCode : 200, status : result.Message, Caption : result.Caption})                 
           }    
    })
})
/**
 * GetById an Entity
 */
router.get('/getById/:id', function(req, res, next){
    var id = req.params.id;
    unitOfWork.wardRepository().getById(id,function(result){
        if(result.Success){
            res.json(result.Data[0])
        }            
        else{
            res.json(result);  
        }            
    })
})
/**
 * Delete an entity
 */
router.post('/removeById/:id', function(req, res, next){
   var id = req.params.id;
    unitOfWork.wardRepository().removeEntity(id,function(result){
         if(result.Success == false){
            res.json({statusCode : 400, status : result.Message, Caption : result.Caption})
         }             
           else{
                res.json({statusCode : 200, status : result.Message, Caption : result.Caption})                 
           }   
    })
})

module.exports = router;