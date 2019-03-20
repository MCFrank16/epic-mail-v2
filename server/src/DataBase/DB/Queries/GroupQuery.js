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


export default {
  GroupMessage,
  createGroupMessage,
  getAllGroupMessage,
};
