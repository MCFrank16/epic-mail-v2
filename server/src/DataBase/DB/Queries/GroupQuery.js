const Group = ` 
CREATE TABLE IF NOT EXISTS 
   Groups (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    ownerId UUID NOT NULL,
    createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE CASCADE
)`;

const createGroup = ` INSERT INTO 
Groups (
    id,
    name,
    role,
    ownerId,
    createdon
) VALUES ($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING returning *`;

const getAllGroup = ' SELECT * FROM Groups WHERE ownerId = $1';
const getAgroupById = ' SELECT * FROM Groups WHERE id = $1 AND ownerId = $2';
const updateAgroup = ' UPDATE Groups SET name = $1 WHERE id = $2 AND ownerId = $3 returning *';
const deleteGroup = ' DELETE FROM Groups WHERE id = $1 AND ownerId = $2 returning *';


export default {
  Group,
  createGroup,
  getAllGroup,
  getAgroupById,
  updateAgroup,
  deleteGroup,
};
