import express from 'express';
import routes from './routers/route'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.use('*', (req,res) => res.status(404).send({
   'Status': 404,
   'Message': 'URL not Found'
  }));


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`app running on port ${ PORT }`);
});

export default app;