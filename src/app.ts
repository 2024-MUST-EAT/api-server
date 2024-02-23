import express, { Application } from 'express';
import session from 'express-session';
import 'express-async-errors';
import router from './domains/routes';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'temp key',
  resave: false,
  saveUninitialized: false,
}))

app.use(router);

app.use((req: express.Request, res: express.Response) => {
  return res.status(404).json({ message: 'Not found' });
});

app.use((err: Error, req: express.Request, res: express.Response): void => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
