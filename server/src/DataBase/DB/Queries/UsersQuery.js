const usersTable = ` 
   CREATE TABLE IF NOT EXISTS 
     Users (
       id UUID PRIMARY KEY,
       firstname VARCHAR(255) NOT NULL,
       lastname VARCHAR(255) NOT NULL,
       email VARCHAR (255) NOT NULL UNIQUE,
       password VARCHAR (255),
       createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
       updatedon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
       isAdmin VARCHAR (255),
       Phone VARCHAR (255)

    )`;

const saveUser = `INSERT INTO Users(
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

const dropUser = 'DROP TABLE IF EXISTS Users';

export default {
  dropUser,
  saveUser,
  usersTable,
};
