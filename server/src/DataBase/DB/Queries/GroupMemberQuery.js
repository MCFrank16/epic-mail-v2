const GroupMember = ` 

CREATE TABLE IF NOT EXISTS 
GroupMember (
 id UUID PRIMARY KEY,
 userId UUID NOT NULL UNIQUE,
 userRole VARCHAR(255) NOT NULL,
 ownerId UUID NOT NULL,
 createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE CASCADE,
 FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
)`;

const addUserToGroup = ` INSERT INTO GroupMember (
    id,
    userId,
    userRole,
    ownerId,
    createdon
) VALUES ($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING returning *`;

const deleteUserToGroup = ' DELETE FROM GroupMember WHERE userId = $1 AND ownerId = $2 returning *';
const checkEmail = ' SELECT * FROM users WHERE email Like $1';

export default {
  GroupMember,
  checkEmail,
  addUserToGroup,
  deleteUserToGroup,
};
