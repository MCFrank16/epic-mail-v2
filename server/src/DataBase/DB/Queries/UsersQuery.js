const usersTable = ` 
   CREATE TABLE IF NOT EXISTS 
     users (
       id UUID PRIMARY KEY,
       firstname VARCHAR(255) NOT NULL,
       lastname VARCHAR(255) NOT NULL,
       email VARCHAR (255) NOT NULL UNIQUE,
       password VARCHAR (255),
       createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
       updatedon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
       isAdmin BOOLEAN NOT NULL,
       Phone VARCHAR (255) NOT NULL

    )`;

const saveUser = `INSERT INTO users(
    id,
    firstname,
    lastname,
    email,
    password,
    createdon,
    updatedon,
    isAdmin,
    Phone

) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT DO NOTHING returning *`;

const loginUser = 'SELECT * FROM users WHERE email = $1 LIMIT 1';
const dropUser = 'DROP TABLE IF EXISTS users';

export default {
  dropUser,
  saveUser,
  usersTable,
  loginUser,
};
