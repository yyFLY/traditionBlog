const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const serve = require('koa-static');
const path = require('path');

/**
 * 解析post请求，但是放在这里效率很低，应该放在每个post请求中间件里
 * router.post('/log/updateLog', bodyParser(),log.updateLog.bind(log))
**/
app.use(bodyParser());

//加载静态资源
/**
 * 路由 为 hello/a.js 但去static下面找a.js的方法
 * 访问指定文件的路径 用 koa-mount 中间件
 * app.use(mount('/hello', serve('./static')));
**/
app.use(serve('./static'));

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

/**
 *  .use(router.allowedMethods()) 允许跨域
 * **/
app
  .use(router.routes())
  .use(router.allowedMethods())

/**
 * 监听3000 端口，后可跟IP，为只允许改IP访问
 * **/
app.listen(3000, (err) => {
  if (err) return console.error(err);
  console.log('server run at 0.0.0.0:3000')
})

// function(err, data) {}