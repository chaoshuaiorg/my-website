const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const static = require('koa-static');

app.use(views(__dirname + '/docs', {
    extension: 'html'
  }))

app.use(static( __dirname + '/docs'))

app.use(async (ctx, next) => {
    await ctx.render('index')
  })

app.listen(3000, () => {
    console.log('app listening 3000');
})