const GroupMember = ` 

CREATE TABLE IF NOT EXISTS 
GroupMessage (
 id UUID PRIMARY KEY,
 createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE CASCADE
)`;

const addUserToGroup = ` INSERT INTO GroupMember (
    id,
    userId,
    userRole,
    ownerId,
    createdon
) VALUES ($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING returning *`;

const deleteUserToGroup = ' DELETE FROM GroupMember WHERE id = $1 AND ownerId = $2 returning *';

export default {
  GroupMember,
  addUserToGroup,
  deleteUserToGroup,
};
