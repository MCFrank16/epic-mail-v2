const GroupMember = ` 

CREATE TABLE IF NOT EXISTS 
GroupMember (
 id UUID PRIMARY KEY,
 memberemail VARCHAR(255) NOT NULL,
 savername VARCHAR(255) NOT NULL,
 ownerId UUID NOT NULL,
 groupId UUID NOT NULL,
 createdon VARCHAR(255) NOT NULL,
 FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE CASCADE,
 FOREIGN KEY (groupId) REFERENCES groups (id) ON DELETE CASCADE
)`;

const addUserToGroup = ` INSERT INTO GroupMember (
    id,
    memberemail,
    savername,
    ownerId,
    groupId,
    createdon
) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING returning *`;

const deleteUserToGroup = ' DELETE FROM GroupMember WHERE groupId = $1 AND memberemail = $2 AND ownerId = $3 returning *';
const checkEmail = ' SELECT * FROM users WHERE email Like $1';

export default {
  GroupMember,
  checkEmail,
  addUserToGroup,
  deleteUserToGroup,
};
