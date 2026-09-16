import express from 'express';
import path from 'node:path';
import { errorHandler } from './errors.js';
import { createIndexRouter } from './routers/indexRouter.js';

const PORT = process.env.PORT ?? 3_000;
const { dirname } = import.meta;
const app = express();

app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', createIndexRouter());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Express app listening on port ${PORT}! http://localhost:${PORT}`,
  );
});
