const Router = require('koa-router')
const router = new Router({ prefix: '/blog' })

const Category = require('../../model/Category')
const Article = require('../../model/Article')

router.get('/getNum', async (ctx, next) => {
    const { length } = await Article.find()
    const model = await Category.find()
    console.log('getNum')
    ctx.body ={
        ArticleNum:length,
        CategoryNum:model.length
    }
})

// 获取文章列表
router.get('/getArticleList', async (ctx, next) => {
    const model = await Article.find()
    ctx.body = model
})
// 获取文章详情
router.get('/getDetils/:id', async (ctx, next) => {
    const model = await Article.findById(ctx.params.id).populate('Category')
    let { Browse } = model; //阅读数
    const data = await Article.findByIdAndUpdate(ctx.params.id, { Browse: ++Browse })
    ctx.body = data
})

// 查所有分类以及下面有多少文章
router.get('/getCateCount', async (ctx, next) => {
    const res = await Category.find().populate('Article')
    const body = res.map(item => ({ count: item.Article.length, name: item.name }))
    ctx.body = body
})

module.exports = router