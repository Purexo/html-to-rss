import App from 'u-http-server';

const app = new App();

app
  .applyOnClientError()
  .listen(3000);

export default app;