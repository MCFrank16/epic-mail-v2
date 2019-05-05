const messagesTable = `
   CREATE TABLE IF NOT EXISTS
     Messages (
        id UUID PRIMARY KEY,
        createdOnDate VARCHAR(255) NOT NULL,
        createdOnTime VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message VARCHAR(255) NOT NULL,
        senderstatus  VARCHAR(255) NOT NULL,
        senderEmail VARCHAR(255) NOT NULL,
        senderFirstname VARCHAR(255) NOT NULL,
        senderLastname VARCHAR(255) NOT NULL,
        receiverEmail VARCHAR(255) NOT NULL,
        parentMessageId UUID NOT NULL,
        senderId UUID NOT NULL,
        receiverStatus VARCHAR(255) NOT NULL,
        FOREIGN KEY (senderId) REFERENCES users (id) ON DELETE CASCADE
     )`;

const saveMessage = ` INSERT INTO Messages(
   id,
   createdOnDate,
   createdOnTime,
   subject,
   message,
   senderstatus,
   senderEmail,
   senderFirstname,
   senderLastname,
   receiverEmail,
   parentMessageId,
   senderId,
   receiverStatus
) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) ON CONFLICT DO NOTHING returning *`;

const getAllMessages = ' SELECT id,subject,message,receiverStatus,senderEmail,senderFirstname,parentMessageId,senderLastname,createdOnDate,createdOnTime FROM Messages WHERE receiverEmail = $1';
const getById = ' SELECT message FROM Messages WHERE id = $1 AND senderEmail = $2';
const getByParentMessageId = ' SELECT * FROM Messages WHERE parentMessageId = $1';
const deleteById = ' DELETE FROM Messages WHERE id = $1 AND senderId = $2 returning *';
const getDraft = ' SELECT * FROM Messages WHERE senderId = $1 AND senderstatus = $2';
const resendMessage = 'UPDATE Messages SET senderstatus = $1, receiverStatus = $2, createdOnDate = $3, createdOnTime = $4 WHERE id = $5 AND senderId = $6 returning *';
const getSent = ' SELECT * FROM Messages WHERE senderId = $1 AND senderstatus = $2';
const getAmessage = ' SELECT * FROM Messages WHERE id = $1 AND senderId = $2 ';
const readMessage = ' UPDATE Messages SET receiverStatus = $1 WHERE id = $2 AND receiverEmail = $3 returning * ';
const getSingleInboxMessage = ' SELECT * FROM Messages WHERE id =$1 AND receiverEmail = $2';

const dropTableMessages = 'DROP TABLE IF EXISTS Messages';

export default {
  messagesTable,
  saveMessage,
  dropTableMessages,
  getAllMessages,
  getById,
  deleteById,
  getDraft,
  resendMessage,
  getSent,
  getByParentMessageId,
  getAmessage,
  readMessage,
  getSingleInboxMessage,
};
