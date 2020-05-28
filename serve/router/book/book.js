const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js').parseString

const EPub = require('../../utils/epub')

const resolve = (url) => path.join(url, '../')
const UPLOAD_PATH = 'E:/练习/myBlog/blog-serve/static'
class Book {
    constructor(file, data) {
        if (file) {
            this.createBookFromFile(file)
        } else {
            this.createBookFromData(data)
        }
    }

    createBookFromFile(file) {
        const { destination, filename, mimetype, path } = file
        const suffix = mimetype === 'application/epub' ? '.epub' : ''
        const oldBookPath = path;
        const bookPath = `${destination}/${filename}`
        this.destination = destination
        this.filename = filename;//文件名
        this.filePath = bookPath;
        this.title = '' //书名
        this.author = '' //作者
        this.publisher = '' //出版社
        this.contents = [] //目录
        this.cover = ''
        // console.log(resolve(destination))

    }
    createBookFromData(data) {

    }

    parse() {
        const bookPath = this.filePath;
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(bookPath)) {
                reject(new Error('电子书不存在'))
            }
            const epub = new EPub(bookPath)
            epub.on('error', err => {
                reject(err)
            })
            epub.on('end', err => {
                if (err) {
                    reject(err)
                } else {
                    const { language, creator, creatorFileAs, title, cover } = epub.metadata
                    if (!title) {
                        reject(new Error('图书标题为空'))
                    } else {
                        this.title = title
                        this.language = language || 'en'
                        this.author = creator || creatorFileAs
                        this.rootFile = epub.rootFile
                        const handleGetImage = (err, file, mimeType) => {
                            if (err) {
                                reject(err)
                            } else {
                                const suffix = mimeType.split('/')[1];
                                const coverPath = `${UPLOAD_PATH}/img/${this.filename}.${suffix}`
                                const coverUrl = `${this.destination}img\/${this.filename}.${suffix}`
                                fs.writeFileSync(coverPath, file, 'binary')
                                this.cover = coverPath
                                resolve(this)
                            }

                        }
                        try {
                            this.unzip()
                            this.parseContents(epub).then(({chapters})=>{
                                this.contents = chapters
                                epub.getImage(cover, handleGetImage)
                            })
                           
                           
                        } catch (e) {
                            reject(e)
                        }


                    }

                }

            })
            epub.parse()
        })
    }

    unzip() {
        const Admzip = require('adm-zip')
        const zip = new Admzip(this.filePath)
        zip.extractAllTo(`${UPLOAD_PATH}/unzip`, true)
    }

    parseContents(epub) {
      return  getNcxFilePath(epub)

        function findParent(array, levle = 0, pid = '') {
            return array.map(item => {
                item.levle = levle
                item.pid = pid
                if (item.navPoint && item.navPoint.length > 0) {
                    item.navPoint = findParent(item.navPoint, levle + 1, item['$'].id)
                }else if(item.navPoint){
                    item.navPoint.levle = levle + 1
                    item.navPoint.pid = item['$'].id
                }
                return item
            })
        }

        function flatten(array) {
            return [].concat(...array.map(item => {
                if(item.navPoint && item.navPoint.length >0){
                    return [].concat(item,...flatten(item.navPoint))
                }else if (item.navPoint){
                    return [].concat(item,item.navPoint)
                }
                return item
            }))
        }
        function getNcxFilePath() {
            const spine = epub && epub.spine
            const manifest = epub && epub.manifest
            const ncx = spine.toc && spine.toc.href
            const id = spine.toc && spine.toc.id
            const ncxFilePath = `${UPLOAD_PATH}/unzip/${ncx}`
            if (fs.existsSync(ncxFilePath)) {
                return new Promise((resolve, reject) => {
                    const xml = fs.readFileSync(ncxFilePath, 'utf-8')
                    xml2js(xml, {
                        explicitArray: false,
                        ignoreAttrs: false
                    }, function (err, json) {
                        if (err) {
                            reject(err)
                        }
                        const navMap = json.ncx.navMap
                        // console.log(JSON.stringify(navMap) )
                        if (navMap.navPoint && navMap.navPoint.length > 0) {
                            navMap.navPoint = findParent(navMap.navPoint)
                            const newNavmap = flatten(navMap.navPoint)
                            const chapters = []
                            epub.flow.forEach((item, index) => {
                                let chapter = {}
                                if (index + 1 > newNavmap.length) {
                                    return
                                }
                                const nav = newNavmap[index]
                                chapter.text = `${UPLOAD_PATH}/unzip/${item.href}`
                                if (nav && nav.navLabel) {
                                    chapter.label = nav.navLabel.text || ''
                                } else {
                                    chapter.label = ''
                                }
                                chapter.levle = nav.levle
                                chapter.pid = nav.pid
                                chapter.navId = nav['$'].id
                                chapter.order = index + 1
                                chapters.push(chapter)
                            });
                            const chapterTree = []
                            chapters.forEach(c=>{
                                c.children= []
                                if(c.pid ===''){
                                    chapterTree.push(c)
                                }else {
                                    const parent = chapters.find(_=>_.navId ===c.pid)
                                    parent.children.push(c)
                                }
                            })
                           resolve({chapters,chapterTree})
                        } else {
                            reject(new Error('目录解析失败,目录为0'))
                        }
                    })

                    // resolve(xml)
                })

            } else {
                throw new Error('不存在路径')
            }
            if (ncx) {
                return ncx
            } else {
                return manifest[id].href
            }

        }
    }
}

module.exports = Book