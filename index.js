const express = require('express');
const slash = require('express-slash');
const path = require('path');
const boom = require('boom');
const { config } = require('./config');
const errorsHandler = require('./utils/middlewares/errorsHandlers');
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');
const helmet = require('helmet');
const cors = require('cors');

const productsRouter = require('./routes/api/products');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/products', require('./routes/views/products'));
productsRouter(app);
app.use('/api/auth', require('./routes/api/auth'));

app.get('/', (req, res) => {
  res.redirect('/products');
});

app.use(slash());

app.use((req, res, next) => {
  if (isRequestAjaxOrApi(req)) {
    const { output: { statusCode, payload } } = boom.notFound();
    res.status(statusCode).json(payload);
  }

  res.status(404).render('404');
})

app.use(errorsHandler.logErros);
app.use(errorsHandler.wrapErrors);
app.use(errorsHandler.clientErrorHandler);
app.use(errorsHandler.errorHandler);

app.listen(config.port, () => console.log(`Server running on http://localhost:${config.port}`));