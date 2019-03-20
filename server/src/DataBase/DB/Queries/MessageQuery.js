const messagesTable = `
   CREATE TABLE IF NOT EXISTS
     Messages (
        id UUID PRIMARY KEY,
        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        subject VARCHAR(255) NOT NULL,
        message VARCHAR(255) NOT NULL,
        status  VARCHAR(255) NOT NULL,
        receiverEmail VARCHAR(255) NOT NULL,
        parentMessageId UUID NOT NULL,
        senderId UUID NOT NULL,
        receiverId UUID NOT NULL,
        FOREIGN KEY (senderId) REFERENCES users (id) ON DELETE CASCADE
     )`;

const saveMessage = ` INSERT INTO Messages(
   id,
   createdOn,
   subject,
   message,
   status,
   receiverEmail,
   parentMessageId,
   senderId,
   receiverId
) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT DO NOTHING returning *`;

const getAllMessages = ' SELECT * FROM Messages WHERE senderId = $1';
const getById = ' SELECT * FROM Messages WHERE id = $1 AND senderId = $2';
const deleteById = ' DELETE FROM Messages WHERE id = $1 AND senderId = $2 returning *';
const getUnread = ' SELECT * FROM Messages WHERE senderId = $1 AND status = $2';
const getSent = ' SELECT * FROM Messages WHERE senderId = $1 AND status = $2';

const dropTableMessages = 'DROP TABLE IF EXISTS Messages';

export default {
  messagesTable,
  saveMessage,
  dropTableMessages,
  getAllMessages,
  getById,
  deleteById,
  getUnread,
  getSent,
};
