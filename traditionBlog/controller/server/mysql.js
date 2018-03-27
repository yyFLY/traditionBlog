var mysql  = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host     : '10.247.17.31',
  user     : '51generalnew',
  password : 'uUZPeL32FpatOvju',
  database : 'my_db',
});
 
  
let query = ( sql,args ) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      // Use the connection
      connection.query(sql, function (error, results, fields) {
        if (error) {
            reject(error)
        } else {
            resolve(results)
        }
        connection.release();
        if (error) throw error;
     
      });
    });
  })

}

// 发表文章
/**
 * 
 * sql 应该使用参数化查询写法
 * 这样写会被xxs的
 */
let addLog = ( params ) => {
  let _sql = `insert into log (lastUpdateTime,pageContent,pageTitle,createTime) values ('${params.lastUpdateTime}','${params.pageContent}','${params.pageTitle}','${params.createTime}')`;
  return query( _sql)
}

let deletLog = ( params ) => {
  let _sql = `delete from log where id= '${params.id}'`;
  return query( _sql)
}

let updateLog = ( params ) =>{
  let _sql =  mysql.format('update log set lastUpdateTime =  ? ,pageContent =  ? ,pageTitle =  ? WHERE id = ?', [params.lastUpdateTime, params.pageContent,params.pageTitle,params.id]);
  return query( _sql)
}

let selectLog = ( params ) => {
  let _sql = `select * from log `;
  return query( _sql)
}

let getLogById = ( params ) => {
  let _sql = `select * from log where id = '${params.id}'`;
  return query( _sql)
}
module.exports = {
  addLog,
  deletLog,
  updateLog,
  selectLog,
  getLogById
}