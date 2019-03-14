import express from 'express';
import routes from '../src/DataStructure/Routers/route'
import routes from '../src/Data-Structure/routers/route';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
const swaggerDocument = YAML.load('server/src/Docs/ApiSwagger.yml');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('*', (req,res) => res.status(404).send({
   'Status': 404,
   'Message': 'URL not Found'
  }));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`the app is running at http://localhost: ${ PORT }`);
});

export default app;