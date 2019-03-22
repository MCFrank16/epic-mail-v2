const GroupMessage = ` 

CREATE TABLE IF NOT EXISTS 
GroupMessage (
 id UUID PRIMARY KEY,
 createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 subject VARCHAR(255) NOT NULL,
 message VARCHAR(255) NOT NULL,
 status VARCHAR(255) NOT NULL,
 parentmessageid UUID NOT NULL,
 groupid UUID NOT NULL,
 ownerid UUID NOT NULL,
 FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE CASCADE,
 FOREIGN KEY (groupid) REFERENCES groups (id) ON DELETE CASCADE
)`;

const addMessage = ` INSERT INTO GroupMessage (
    id,
    createdon,
    subject,
    message,
    status,
    parentmessageid,
    groupid,
    ownerid
) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING returning *`;

export default {
  GroupMessage,
  addMessage,
};
