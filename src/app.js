import dotenv from 'dotenv'
import path from 'path'
import routes from './routes'
import koaBody from 'koa-body'
import koaStatic from 'koa-static'
import Pug from 'koa-pug'
import Koa from 'koa'

dotenv.config()

const app = module.exports = new Koa()
const pug = new Pug({
  viewPath: path.join(__dirname, '/views'),
  debug: false,
  pretty: false,
  compileDebug: false,
  helperPath: [],
  app: app
})

app.use(koaStatic(path.join(__dirname, './static')))
app.use(koaBody())
app.use(routes)

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

let port = process.env.PORT || 3000
console.log(`listening on port ${port}`)

app.listen(port)
