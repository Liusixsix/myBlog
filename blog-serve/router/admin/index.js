const Router = require('koa-router')
const router = new Router({ prefix: '/admin' })

const Category = require('../../model/Category')
const Article = require('../../model/Article')

// 获取所有分类
router.get('/', async (ctx, next) => {
    const model = await Category.find()
    ctx.body = model
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
    ctx.body = model
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
    const model = await Article.findByIdAndUpdate( ctx.params.id,ctx.request.body)
    ctx.body = model
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

module.exports = router;

