/**
 * Created by nizhiwei-labtop on 2017/7/18.
 */
let https = require("https");
// let https = require("http");
let url = require("url");
let zlib = require("zlib");
module.exports=function (path,data={},cb,header) {
    data=JSON.stringify(data);
    let opt = {
        host:'app.51fanbei.com',
        // port: 443,
        port: 443,
        method:'post',
        path:path,
        rejectUnauthorized: false,
        requestCert: true,
        headers:{
            'Accept':'*/*',
            'Accept-Encoding':'gzip, deflate',
            'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
            'Content-Type':'application/json',
        }
    };
    if(header){
        for (let key in header){
            opt.headers[key]=header[key];
        }
    }
    let body=[],test='';
    let req = https.request(opt, function(res) {
        res.on('data',function(data){
            test+=data;
            body.push(data)
        }).on('end', function(){
            try{
                test=JSON.parse(test);
                cb(test);
            }catch (e){
                let buffer = Buffer.concat(body);
                zlib.gunzip(buffer, function (err, decoded) {
                    cb(JSON.parse(decoded.toString()))
                });
            }
        });
    }).on('error', function(e) {
        console.log('javaError:'+e.message);
        body = {error:e.message};
        cb(body);
    });
    req.write(data);
    req.end();
};







