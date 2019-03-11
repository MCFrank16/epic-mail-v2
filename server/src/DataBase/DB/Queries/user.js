const createTableOfUsers = `
CREATE TABLE IF NOT EXISTS 
Users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName  VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    userName VARCHAR(255) NOT NULL,
    passWord VARCHAR(255),
    isAdmin VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modifiedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

)`;

const insertUser = ` INSERT INTO Users(
    id,firstName,lastName,email,userName,passWord,isAdmin,createdAt,modifiedAt)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT DO NOTHING  returning *`;

const dropTableOfUsers = 'DROP TABLE IF EXISTS Users';

export default {
    dropTableOfUsers,
    insertUser,
    createTableOfUsers
};
