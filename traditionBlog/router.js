const Router = require('koa-router')
const router = new Router()

const user = require('./controller/user')
const log = require('./controller/log')

router.get('/', log.getLog)
router.post('/user/login', user.login)
router.get('/user/profile', user.profile)

router.get('/log/getLogList', log.getLog.bind(log))
router.post('/log/addLog', log.addLog.bind(log))
//log.deletLog 是一个方法，指向内存的一个地址。所以不带this，this 为 undefined，所以要内部调用的话要将this指向自己。
router.get('/log/deletLog', log.deletLog.bind(log))

router.post('/log/updateLog', log.updateLog.bind(log))
router.get('/log/goUpdateLog', log.goUpdateLog.bind(log))


module.exports = router


/**
 * url 不要用大小写 中间应该用 _ 分割
 * 
 * 路由 增删改查 应该采用restful 写法
 * 
 * 
  router.get('/log/:id(\\d+)')
  router.delete('/log/:id(\\d+)')
  router.put('/log')
  router.post('/log/:id(\\d+)')
 * 
 * router.get('/log/:id(\\d+)', log.goUpdateLog.bind(log))
 * 取参数： ctx.params.id,
 * **/