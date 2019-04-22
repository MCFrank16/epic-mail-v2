import express from 'express';
import path from 'path';
import helmet from 'helmet';
// import favicon from 'serve-favicon';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import routes from './server/src/DataBase/Routers/route';
import swaggerDocument from './server/src/Docs/ApiSwagger.json';


const app = express();

app.use('/api-docs/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(cors());
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     imgSrc: ["'self'"],
//     styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
//   },
// }));

app.use(helmet());
app.use('*', (req, res) => res.status(404).send({
  Status: 404,
  Message: 'URL not Found',
}));

// app.use((req, res, next) => {
//   if (req.originalUrl && req.originalUrl.split('/').pop() === 'favicon.ico') {
//     return res.sendStatus(204);
//   }

//   return next();
// });


// const uiPath = path.join(__dirname, './UI/');
// console.log(uiPath);
// app.use(express.static(uiPath));
// app.use('uploads', express.static('uploads'));
// app.use(favicon(path.join(__dirname, 'UI', 'favicon.ico')));

// app.get('/login', (req, res) => {
//   res.sendFile(`${uiPath}html/Login.html`);
// });

// app.get('/', (req, res) => {
//   res.send('do you work??');
// });

// app.get('/index', (req, res) => {
//   res.sendFile(`${uiPath}html/index.html`);
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`the app is running at http://localhost: ${PORT}`);
});

export default app;
