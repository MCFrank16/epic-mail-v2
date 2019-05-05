import express from 'express';
import path from 'path';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import routes from './server/src/DataBase/Routers/route';
import swaggerDocument from './server/src/Docs/ApiSwagger.json';


const app = express();

app.use('/api-docs/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

const uiPath = path.join(__dirname, './UI/');
app.use(favicon(`${uiPath}Images/favicon.ico`));
app.use(express.static(uiPath));

app.get('/login', (req, res) => {
  res.sendFile(`${uiPath}html/Login.html`);
});

app.get('/index', (req, res) => {
  res.sendFile(`${uiPath}html/index.html`);
});

// serve client user pages

app.get('/compose/email', (req, res) => {
  res.sendFile(`${uiPath}html/ClientUser/clientCompose.html`);
});

app.get('/inbox', (req, res) => {
  res.sendFile(`${uiPath}html/ClientUser/clientInbox.html`);
});

app.get('/inbox/:id', (req, res) => {
  res.sendFile(`${uiPath}html/ClientUser/clientOpenMail.html`);
});

app.get('/sent', (req, res) => {
  res.sendFile(`${uiPath}html/ClientUser/clientSentMessage.html`);
});

app.get('/draft', (req, res) => {
  res.sendFile(`${uiPath}html/ClientUser/clientdraftMessage.html`);
});

// serve admin user pages
app.get('/admin/compose/email', (req, res) => {
  res.sendFile(`${uiPath}html/admin/compose.html`);
});

app.get('/admin/inbox', (req, res) => {
  res.sendFile(`${uiPath}html/admin/Inbox.html`);
});

app.get('/admin/inbox/:id', (req, res) => {
  res.sendFile(`${uiPath}html/admin/openMail.html`);
});

app.get('/admin/sent', (req, res) => {
  res.sendFile(`${uiPath}html/admin/SentMessage.html`);
});

app.get('/admin/draft', (req, res) => {
  res.sendFile(`${uiPath}html/admin/draftMessage.html`);
});

app.get('/admin/start/group', (req, res) => {
  res.sendFile(`${uiPath}html/admin/createGroup.html`);
});

app.get('/admin/mygroups', (req, res) => {
  res.sendFile(`${uiPath}html/admin/myGroups.html`);
});

app.get('/admin/mygroup/:id', (req, res) => {
  res.sendFile(`${uiPath}html/admin/GroupSettings.html`);
});

app.use('*', (req, res) => res.status(404).send({
  Status: 404,
  Message: 'URL not Found',
}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`the app is running at http://localhost: ${PORT}`);
});

export default app;
