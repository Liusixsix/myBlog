const Router = require('koa-router')
const router = new Router({ prefix: '/blog' })

// const Category = require('../../model/Category')
const Article = require('../../model/Article')

// 获取文章列表
router.get('/getArticleList', async (ctx, next) => {
    const model = await Article.find()
    ctx.body = model
})

router.get('/getDetils/:id', async (ctx, next) => {
    const model = await Article.findById(ctx.params.id).populate('Category')
    ctx.body = model
})

module.exports = router