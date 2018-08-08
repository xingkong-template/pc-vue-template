let environment = process.env.NODE_ENV;
let querystring = require("querystring");
let zlib = require("zlib");
let URL = require('url');
let https = require("https");
let javaUrl = process.env.javaUrl,
    port = process.env.port;
console.log('-------------------',process.env.msg,'-------------------');
module.exports = function(req, cb) {
    if (environment === 'test' || environment === 'l') { //开发、测试环境
        let query = URL.parse(req.headers.referer, true).query;

        //自定义连接服务器
        javaUrl = query.javaurl|| process.env.javaUrl;

        //自定义连接服务器端口号
        port = query.port|| process.env.port;

        //修改协议
        if (query.httptype == 'http') {
            https = require("http");
        } else if (query.httptype == 'https') {
            https = require("https");
        }else{
            if (process.env.http === 'http') { //本地开发为http
                https = require("http");
            }else{
                https = require("https");
            }
        }
    }
    let option = {
        host: javaUrl,
        port: port,
        method: req.method,
        path: req.url,
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'referer': req.headers.referer,
            'x-forwarded-for': req.headers['x-real-ip'] ||
            req.headers['x-forwarded-for'] ||
            req.socket.remoteAddress || ''
            // 'x-forwarded-for': req.connection.remoteAddress
        },
        rejectUnauthorized: false,
        requestCert: true,
    };
    console.log("option>>>>", option)

    let body = [],
        test = '';
    let httpRequest = https.request(option, function(httpRes) {
        httpRes.on('data', function(data) {
            test += data;
            body.push(data)
        }).on('end', function() {
            try {
                test = eval('(' + test + ')');
                cb(test);
            } catch (e) {
                let buffer = Buffer.concat(body);
                zlib.gunzip(buffer, function(err, decoded) {
                    try {
                        cb(eval('(' + decoded.toString() + ')'))
                    } catch (e) {
                        console.log(test);
                        cb(test)
                    }
                });
            }
        });
    }).on('error', function(e) {
        console.log('javaError:' + e.message);
        body = { error: e.message };
    });
    httpRequest.write(querystring.stringify(req.body));
    httpRequest.end();
};