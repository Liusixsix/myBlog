const Router = require('koa-router')
const path = require('path')
const router = new Router()
const multer = require('koa-multer');

const resolve = (dir) => path.join(__dirname, '../../', dir)


let storage = multer.diskStorage({
    destination: resolve('/static/book'),
    filename: (ctx, file, cb) => {
        cb(null, file.originalname);
    }
});
let upload = multer({ storage: storage });

router.post('/upbook',upload.single('file'), async (ctx, next) => {
    ctx.body = {
        data: '22'
    }
})


module.exports = router;