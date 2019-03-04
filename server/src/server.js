import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to Epic Mail RestApi Endpoint' }));

app.listen(process.env.PORT || 4000, () => {
  console.log('app running on port 4000');
});
