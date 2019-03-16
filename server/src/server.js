import express from 'express';
import swaggerUI from 'swagger-ui-express';
import routes from './DataBase/Routers/route';
import swaggerDocument from './Docs/ApiSwagger.json';

const app = express();


app.use('/api-docs/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.use('*', (req, res) => res.status(404).send({
  Status: 404,
  Message: 'URL not Found',
}));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`the app is running at http://localhost: ${PORT}`);
});

export default app;
