const mysql = require('./mysql');

async function getLogs(ctx) {
  let res = await mysql.selectLog();
  return res;
}
async function addLog(ctx,args) {
  let res = await mysql.addLog(args);
  return res;
}
async function deletLog(ctx,args) {
  let res = await mysql.deletLog(args);
  return res;
}
async function updateLog(ctx,args) {
  let res = await mysql.updateLog(args);
  return res;

}
async function getLogById(ctx,args) {
  let res = await mysql.getLogById(args);
  return res;
}

module.exports = {
  getLogs,
  addLog,
  deletLog,
  updateLog,
  getLogById,
}