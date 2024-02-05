import express, { Application } from 'express';
import 'express-async-errors';
import router from './domains/routes';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
