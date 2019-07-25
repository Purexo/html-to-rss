import RSS from 'rss';
import fetch from 'node-fetch';
import format from 'date-fns/format/index.js';

import app from '../server.js';

const hytale_list = 'https://hytale.com/api/blog/post/published';
const hytale_article = 'https://hytale.com/api/blog/post/slug/';

const hytale_feed = (request) => ({
  'title': 'Hytale',
  'description': 'News from Hytale',
  'feed_url': `http://${request.headers.host}/${request.url}`,
  'site_url': 'https://hytale.com/news',
  'image_url': 'https://hytale.com/static/images/logo.png',
});

const hytale_path = '/rss/hytale';

const getArticleUrl = item => `https://hytale.com/news/${format(item.createdAt, 'yyyy/MM')}/${item.slug}`;

/**
 * Fetch all articles from hytale (complete)
 */
app.get(hytale_path, async ctx => {
  const articles_resume = await fetch(hytale_list).then(r => r.json());

  return Promise.all(
    articles_resume.map(a => fetch(hytale_article + a.slug).then(r => r.json()))
  );
});

/**
 * transform articles in rss format
 */
app.get(hytale_path, (ctx, articles) => articles.reduce((feed, item) => feed.item({
    title: item.title,
    description: item.body,
    url: getArticleUrl(item),
    guid: `${item.slug}-${item._id}`,
    categories: item.tags,
    author: item.author,
    date: item.publishedAt,
    enclosure: {
      url: `https://hytale.com/m/variants/blog_cover_${item.coverImage.s3Key}`,
      type: item.coverImage.mimeType,
    }
  }), new RSS(hytale_feed(ctx.request.url.toString()))).xml({indent: true}));
