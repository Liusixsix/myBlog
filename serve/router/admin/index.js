const Router = require('koa-router')
const router = new Router({ prefix: '/admin' })
const jwt = require('jsonwebtoken')

const Category = require('../../model/Category')
const Article = require('../../model/Article')
const Tags = require('../../model/Tags')
const User = require('../../model/User')
const Result = require('../../utils/Result')

const secret = 'token'

// 获取所有分类
router.get('/', async (ctx, next) => {
    const model = await Category.find()
    ctx.body = model
})


// 登录
router.post('/login', async (ctx, next) => {
    const { username, password } = ctx.request.body;
    const user = await User.findOne({ username })
    if (!user) {
        new Result('用户不存在').fail(ctx)
        return
    }
    const isValid = await User.findOne({ username, password })
    if (!isValid) {
        new Result('密码错误').fail(ctx)
        return
    }
    let payload = {
        id: user._id,
    }
    let token = jwt.sign(payload, secret,{expiresIn:60 * 60})
    new Result({ token }, '登录成功').success(ctx)
})


// 新建分类
router.post('/addCategory', async (ctx, next) => {
    const model = await Category.create(ctx.request.body)
    ctx.body = model
})

// 修改分类
router.post('/Category/:id', async (ctx, next) => {
    const model = await Category.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    ctx.body = model
})

// 删除分类
router.delete('/Category/:id', async (ctx, next) => {
    const model = await Category.findByIdAndDelete(ctx.params.id)
    ctx.body = model
})


// 新建文章
router.post('/addArticle', async (ctx, next) => {
    const model = await Article.create(ctx.request.body)
    const data = await Category.findByIdAndUpdate(ctx.request.body.Category, { Article: model._id })
    ctx.body = data
})

// 获取所有文章
router.get('/Article', async (ctx, next) => {
    const model = await Article.find().populate('Category').limit(10)
    ctx.body = model
})

// 根据id获取文章
router.get('/ArticleById/:id', async (ctx, next) => {
    const model = await Article.findOne({ _id: ctx.params.id }).populate('Category')
    ctx.body = model
})

// 根据id修改文章
router.post('/uptateById/:id', async (ctx, next) => {
    const model = await Article.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    const data = await Category.findByIdAndUpdate(ctx.request.body.Category, { Article: model._id })
    ctx.body = data
})
// // 根据id获取所属的分类
// router.get('/getParentById/:id', async (ctx, next) => {
//     console.log(ctx.params.id)
//     const model = await Article.findOne({ _id: ctx.params.id })
//     console.log(model)
//     ctx.body = model
// })

// 删除文章
router.delete('/Article/:id', async (ctx, next) => {
    const model = await Article.findByIdAndDelete(ctx.params.id)
    ctx.body = model
})

// 标签

router.post('/tags/:id', async (ctx, next) => {
    const model = await Tags.create(ctx)
    ctx.body = model
})

module.exports = router;

