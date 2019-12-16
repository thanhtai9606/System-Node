var express = require('express');
var router = express();

router.get('/', function(req, res, next){
    var currentUser = req.session.currentUser;
    if(currentUser ==null)
        res.redirect('/Admin'); //redirect if session is null
    res.render('index2.ejs', { Title: 'Hello ', FullName : currentUser.FirstName, Avatar : currentUser.Avatar });
});
router.get('/login', function(req,res,next){
    res.render('login.ejs', { Title:'Login Page'});
})

module.exports = router;