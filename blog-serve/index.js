const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const jwtKoa = require('koa-jwt')

const Result = require('./utils/Result')
const secret = 'token'

app.use(require('koa-cors')())
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public/dist'))


app.use((ctx,next)=>{
    return next().catch(err=>{
       if(err.name&&err.name==='UnauthorizedError'){
           const { status=401,massage} = err;
           ctx.status = 401;
           ctx.body = {
               code:401,
               msg:'token验证失败'
           }
       }else{
        ctx.status = 500;
            ctx.body = {
                code:500,
                msg:'系统错误'
            }
       }
        
    })
})
app.use(jwtKoa({secret,credentialsRequired:true}).unless({
    path:[/^\/admin\/login/,/^\/blog\//,]
}))


require('./db/index')(app)
const admin = require('./router/admin')
const blog = require('./router/blog')
const book = require('./router/book')
app.use(admin.routes(), admin.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(book.routes(), book.allowedMethods())
app.use(async (ctx, next) => {
    next()
})



app.on('err', (err, ctx) => {
    console.error('server error :', err)
})

app.listen(3000)