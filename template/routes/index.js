let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '西瓜信用商户' });
});
module.exports = router;