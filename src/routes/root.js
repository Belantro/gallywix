import Router from 'koa-router'

const router = new Router({ prefix: '/' })

router
  .get('/', async (ctx) => {
    await ctx.render('login')
  })
  .post('/', async (ctx) => {
    console.log('posted to login')
    await ctx.render('login')
  })

export default router
