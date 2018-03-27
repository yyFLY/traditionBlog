
const api = require('./server/api');
const moment = require('moment'); 

module.exports = {
  async addLog (ctx) {
    
    let obj = {
      lastUpdateTime : moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
      pageContent : ctx.request.body.pageContent,
      pageTitle : ctx.request.body.pageTitle,
      createTime : moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
    };
     
    let result = await api.addLog(ctx,obj);
    if(result.affectedRows > 0){
      await this.getLog(ctx);
    }
  },
  async deletLog (ctx) {

    let obj = {
      id : ctx.request.query.id,
    };

    let result = await api.deletLog(ctx,obj);
    if(result.affectedRows > 0){
      await this.getLog(ctx);
    }
  },
  async updateLog (ctx) {
    let obj = {
      lastUpdateTime : moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
      pageContent : ctx.request.body.pageContent,
      pageTitle : ctx.request.body.pageTitle,
      id : ctx.request.body.id,
    };
     
    let result = await api.updateLog(ctx,obj); 
    if(result.affectedRows > 0){
      await this.getLog(ctx);
    }
  },
  async goUpdateLog(ctx){ 
    let obj = {
      id : ctx.request.query.id,
    };
    let result = await api.getLogById(ctx,obj);
    if(result.length > 0){
      await ctx.render('updateLog', {
        result:result[0],
        moment:moment,
      });
    }
    else{
      this.getLog(ctx);
    }
  },
  async getLog (ctx) {
      let result = await api.getLogs();
      await ctx.render('log', {
        result:result,
        moment:moment,
      });
    }
}
