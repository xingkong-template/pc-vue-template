/**
 * Created by nizhiwei-labtop on 2017/7/31.
 */
let crypto=require('crypto');
module.exports=function (data) {
    data=data.toString();
    let md5=crypto.createHash('md5');
    md5.update(data);
    data=md5.digest('hex');
    return data
};
//test