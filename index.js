const Koa = require('koa')

const app = new Koa()

const PORT = process.env.PORT || 3000
const HOST = process.env.IP || '0.0.0.0'

app.listen(PORT, HOST, () => {
    console.log(`服务启动成功： http://${HOST}:${PORT}`)
})
