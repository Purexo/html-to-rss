import app from '../server.js';

/**
 * Get rss generated from each flux and render it response (with Contet-Type Header)
 */
app.get('/rss/:flux', (ctx, rss) => {
  ctx.response.setHeader('Content-Type', 'application/rss+xml');
  ctx.response.end(rss);
});