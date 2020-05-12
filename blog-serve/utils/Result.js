const CODE_SUCCESS = 200
const CODE_ERROR = -1
class Result {
    constructor(data, msg = '操作成功', options = {}) {
        this.data = null;
        if (arguments.length === 0) {
            this.msg = '操作成功'
        } else if (arguments.length === 1) {
            this.msg = data
        } else {
            this.data = data
            this.msg = msg
            if (options) {
                this.options = options
            }
        }
    }
    createResult() {
        if (!this.code) {
            this.code = CODE_SUCCESS
        }
        let base = {
            code: this.code,
            msg: this.msg
        }
        if (this.data) {
            base.data = this.data
        }
        if (this.options) {
            base = { ...base, ...this.options }
        }
        console.log(base)
        return base
    }

    body(ctx) {
        ctx.body = this.createResult()
    }

    success(ctx) {
        this.code = CODE_SUCCESS
        ctx.body = this.createResult()
    }

    fail(ctx) {
        this.code = CODE_ERROR
        this.body(ctx)
    }
}

module.exports = Result