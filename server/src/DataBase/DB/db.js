/* eslint-disable no-console */
import { Pool } from 'pg';
import dotenv from 'dotenv';
import messageQuery from '../Queries/MessageQuery';
import UsersQuery from '../Queries/UsersQuery';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('You are connected to the database');
});


const createTableOfMessages = async () => {
  const querytext = messageQuery.messagesTable;
  await pool.query(querytext)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createTableOfUsers = async () => {
  const querytext = UsersQuery.usersTable;
  await pool.query(querytext)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

(async () => {
  await createTableOfMessages();
  await createTableOfUsers();
  pool.end();
  console.log('Tables are created');
})().catch((err) => {
  console.log(err);
});
