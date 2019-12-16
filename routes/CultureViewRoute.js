var express = require('express');
var router = express();
var unitOfWork = require('../core/UnitOfWork');

router.get('/', function(req,res, next){
    var currentUser = req.session.currentUser;
    if(currentUser ==null)
        res.redirect('/Admin'); //redirect if session is null
    res.render('Admin/CultureView.ejs', { Title: 'Culture View Page ', FullName : currentUser.FirstName, Avatar : currentUser.Avatar });
})
router.post('/GetTypeLanguage/:lang', function(req, res, next){
    var lang = req.params.lang;
     unitOfWork.cultureViewRepository().getTypeLanguage(lang,function(result){
        if(result.Success =true)
            {
                res.json(result.Data)
            }
            else
            {
                res.json(result);
            }        
    })
})
/**
 * List all Entities
 */
router.get('/getAllEntities', function(req, res, next){
    unitOfWork.cultureViewRepository().getAllEntity(function(result){
        if(result.Success)
            res.json(result.Data)
        res.json(result);
    })
})
/**
 * update Entities
 */
router.post('/editEntity/', function(req, res,next){
    var entity = req.body
    unitOfWork.cultureViewRepository().editEntity(entity,function(result){
         if(result.Success = false)
             res.json({statusCode : 400, status : result.Message, Caption : result.Caption})
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
    unitOfWork.cultureViewRepository().addEntity(entity,function(result){
        if(result.Success = false)
             res.json({statusCode : 400, status : result.Message, Caption : result.Caption})
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
    unitOfWork.cultureViewRepository().getById(id,function(result){
        if(result.Success)
            res.json(result.Data[0])
        res.json(result);  
    })
})
/**
 * Delete an entity
 */
router.post('/removeById/:id', function(req, res, next){
   var id = req.params.id;
    unitOfWork.cultureViewRepository().removeEntity(id,function(result){
         if(result.Success = false)
             res.json({statusCode : 400, status : result.Message, Caption : result.Caption})
           else{
                res.json({statusCode : 200, status : result.Message, Caption : result.Caption})                 
           }    
    })
})


module.exports = router;