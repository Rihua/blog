var MongoClient=require('mongodb').MongoClient
var settings=require('../settings')

function Db(){
    this.url=settings.url;
}

module.exports=Db;


Db.prototype.insert=function(data,col,cb){
    var insertData=function(db,callback){
        var collection=db.collection(col);
        collection.insert(data,function(err,result){
            if(err){
                console.log('Error:'+err);
                return cb(err);
            }
            callback(null,result);
        })
    }


    MongoClient.connect(this.url,function(err,db){
        console.log('连接成功！');
        insertData(db,function(newerr,result){
            db.close();
            cb(null,result);
        })
    })

}

Db.prototype.find=function(data,col,cb){
    var selectData=function(db,callback){
        var collection=db.collection(col);
        var whereStr=data;
        collection.find(whereStr).sort({
            time: -1
        }).toArray(function(err,result){
            if(err){
                return cb(err);
            }

            callback(null,result);
        })
    }

    MongoClient.connect(this.url,function(err,db){
        console.log('连接成功！');
        selectData(db,function(newerr,result){
            db.close();
            cb(null,result);
        })
    })
}