const Router = require('koa-router')
const path = require('path')
const router = new Router()
const multer = require('koa-multer');

const Book = require('./book')
const Result = require('../../utils/Result')
const resolve = (dir) => path.join(__dirname, '../../', dir)


let storage = multer.diskStorage({
    destination: resolve('/static/book'),
    filename: (ctx, file, cb) => {
        cb(null, file.originalname);
    }
});
let upload = multer({ storage: storage });

router.post('/upbook', upload.single('file'), async (ctx, next) => {
    const book = new Book(ctx.req.file)
   
    try {
        const res = await book.parse()
        console.log(res)
        new Result(res,'上传成功').success(ctx)
        
    }catch(err) {
        console.log(err)
    }
  
  
})


module.exports = router;