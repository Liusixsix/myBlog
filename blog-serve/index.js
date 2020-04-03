const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')

app.use(require('koa-cors')())
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

require('./db/index')(app)
const admin = require('./router/admin')
const blog = require('./router/blog')
app.use(admin.routes(), admin.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(async (ctx, next) => {
    next()
})


app.on('err', (err, ctx) => {
    console.error('server error :', err)
})

app.listen(3000)