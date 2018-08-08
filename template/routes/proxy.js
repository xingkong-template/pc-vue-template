let express = require('express');
let router = express.Router();
let javaProxy=require('./common/javaHttp.js');

router.post('/**', function(req, res) {
    javaProxy(req,function (data) {
        console.log("return>>>>>>>>",data)
        res.send(data)
    })
});
module.exports = router;
