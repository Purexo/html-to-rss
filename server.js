import App from './lib/server/index.js';
import osmosis from 'osmosis';

const app = new App();

const hytale = 'https://hytale.com/news';
osmosis.get(hytale)
.find('.layout__body__foreground__upper__content > .row postWrapper a')
.follow('@href')
.find('.layout__body__foreground__upper__content > .postLayout > div:not(.latestPost) .post')
.set({
    title: '.post__heading',
    cover: '.post__coverImage@src',
    author: '.post__meta .post__meta__publishDate !~',
    date: '.post__meta__publishDate@title',
    content: '.post__body',
})
.data(listing => {
    console.log(listing);
})
.log(console.log)
.error(console.log)
.debug(console.log);

/*
app.get('/rss', async ctx => {
    ctx.response.end('toto');
});

app
    .applyOnClientError()
    .listen(3000);
    */