const Group = ` 
CREATE TABLE IF NOT EXISTS 
   Groups (
    id UUID PRIMARY KEY,
    groupname VARCHAR(255) NOT NULL,
    ownername VARCHAR(255) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    ownerId UUID NOT NULL,
    createdon VARCHAR(255) NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE CASCADE
)`;

const createGroup = ` INSERT INTO 
Groups (
    id,
    groupname,
    ownername,
    topic,
    ownerId,
    createdon
) VALUES ($1,$2,$3,$4,$5, $6) ON CONFLICT DO NOTHING returning *`;

const getAllGroup = ' SELECT * FROM Groups WHERE ownerId = $1';
const getAgroupById = ' SELECT * FROM Groups WHERE id = $1 AND ownerId = $2';
const updateAgroup = ' UPDATE Groups SET name = $1 WHERE id = $2 AND ownerId = $3 returning *';
const deleteGroup = ' DELETE FROM Groups WHERE id = $1 AND ownerId = $2 returning *';
const getAllMembers = ' SELECT COUNT(*) FROM GroupMember WHERE groupid = $1 ';


export default {
  Group,
  createGroup,
  getAllGroup,
  getAgroupById,
  updateAgroup,
  deleteGroup,
  getAllMembers,
};
