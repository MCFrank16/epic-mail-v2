import { Pool } from 'pg';
import dotenv from 'dotenv';
import userQueries from '../DB/Queries/user';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('Database is Online');
});

//create table of Users
const createTableOfUsers = async () => {
    const queryText = userQueries.createTableOfUsers;
    await pool.query(queryText)
    .then(() => {
        console.log('The table of users has been created');
        pool.end();

    })
    .catch((err) => {
        console.log(err);
        pool.end();
    });
};

export default {
    createTableOfUsers
};

require('make-runnable');
