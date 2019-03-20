const GroupMessage = ` 
CREATE TABLE IF NOT EXISTS 
   GroupMessage (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    ownerId UUID NOT NULL,
    createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE CASCADE
)`;

const createGroupMessage = ` INSERT INTO 
GroupMessage (
    id,
    name,
    role,
    ownerId,
    createdon
) VALUES ($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING returning *`;

const getAllGroupMessage = ' SELECT * FROM GroupMessage WHERE ownerId = $1';
const getAgroupById = ' SELECT * FROM GroupMessage WHERE ownerId = $1';
const updateAgroup = ' UPDATE GroupMessage SET name = $1 WHERE id = $2 AND ownerId = $3';
const deleteGroup = ' DELETE FROM GroupMessage WHERE id = $1 AND ownerId = $2 returning *';


export default {
  GroupMessage,
  createGroupMessage,
  getAllGroupMessage,
  getAgroupById,
  updateAgroup,
  deleteGroup,
};
