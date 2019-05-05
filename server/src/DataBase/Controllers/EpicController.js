import uuid from 'uuid';
import validate from '../Helpers/validate';
import MessageQuery from '../DB/Queries/MessageQuery';
import Pool from '../DB/QueryExecutor';

class MessageData {
  // post/ create a message
  static async postMessage(req, res) {
    const {
      message, subject, receiverEmail,
    } = req.body;

    if (!message || !subject || !receiverEmail) {
      return res.status(400).send({
        status: 400,
        message: 'Please fill in all the requirements',
      });
    }

    if (!validate.emailValidation(receiverEmail)) {
      return res.status(400).send({
        status: 400,
        message: 'Please enter a valid Email',
      });
    }

    if (!validate.subjectValidation(subject)) {
      return res.status(400).send({
        status: 400,
        message: 'Please enter the subject',
      });
    }

    if (!validate.messageValidation(message)) {
      return res.status(400).send({
        status: 400,
        message: 'Please enter your message',
      });
    }

    const queryText = MessageQuery.saveMessage;
    const values = [
      uuid.v4(),
      new Date().toDateString(),
      new Date().toLocaleTimeString(),
      subject,
      message,
      'sent',
      req.user.email,
      req.user.firstname,
      req.user.lastname,
      receiverEmail,
      uuid.v4(),
      req.user.id,
      'unread',
    ];

    try {
      const { rows } = await Pool.query(queryText, values);
      return res.status(201).send({
        status: 201,
        data: rows[0],
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        status: 400,
        message: 'Bad Request to the server',
      });
    }
  }

  // create or save a message as a draft

  static async makeDraftMessage(req, res) {
    const {
      message, subject, receiverEmail,
    } = req.body;

    if (!message || !subject || !receiverEmail) {
      return res.status(400).send({
        status: 400,
        message: 'Please fill in all the requirements',
      });
    }

    if (!validate.emailValidation(receiverEmail)) {
      return res.status(400).send({
        status: 400,
        message: 'Please enter a valid Email',
      });
    }

    if (!validate.subjectValidation(subject)) {
      return res.status(400).send({
        status: 400,
        message: 'Please enter the subject',
      });
    }

    if (!validate.messageValidation(message)) {
      return res.status(400).send({
        status: 400,
        message: 'Please enter your message',
      });
    }

    const queryText = MessageQuery.saveMessage;
    const values = [
      uuid.v4(),
      new Date().toDateString(),
      new Date().toLocaleTimeString(),
      subject,
      message,
      'draft',
      req.user.email,
      req.user.firstname,
      req.user.lastname,
      receiverEmail,
      uuid.v4(),
      req.user.id,
      'unreceived',
    ];

    try {
      const { rows } = await Pool.query(queryText, values);
      return res.status(201).send({
        status: 201,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'Bad Request to the server',
      });
    }
  }
  // retrieve all the inbox messages

  static async getInboxMessages(req, res) {
    const all = MessageQuery.getAllMessages;

    try {
      const { rows, rowCount } = await Pool.query(all, [req.user.email]);
      return res.status(200).send({
        status: 200,
        data: rows,
        rowCount,
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'Bad Request to the server',
      });
    }
  }
  // retrieve a message based on its ID

  static async getMessageById(req, res) {
    const queryText = MessageQuery.getById;
    const values = [req.params.id, req.user.email];
    try {
      const { rows } = await Pool.query(queryText, values);
      if (!rows) {
        return res.status(404).send({
          status: 404,
          message: 'Message not found',
        });
      }
      return res.status(200).send({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'Bad Request to the server',
      });
    }
  }
  // retrieve a message based on its parentMessageID

  static async getMessageByParentMessageId(req, res) {
    const queryText = MessageQuery.getByParentMessageId;
    const values = [req.params.parentMessageId];
    try {
      const { rows, rowCount } = await Pool.query(queryText, values);
      if (!rows) {
        return res.status(404).send({
          status: 404,
          message: 'Message not found',
        });
      }
      return res.status(200).send({
        status: 200,
        data: rows,
        rowCount,
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'Bad Request to the server',
      });
    }
  }
  // reply a message

  static async replyMessage(req, res) {
    const {
      message, subject, receiverEmail,
    } = req.body;

    if (!message || !subject || !receiverEmail) {
      return res.status(400).send({
        status: 400,
        message: 'Please fill in all the requirements',
      });
    }

    if (!validate.emailValidation(receiverEmail)) {
      return res.status(400).send({
        status: 400,
        message: 'Please enter a valid Email',
      });
    }

    if (!validate.subjectValidation(subject)) {
      return res.status(400).send({
        status: 400,
        message: 'Please enter the subject',
      });
    }

    if (!validate.messageValidation(message)) {
      return res.status(400).send({
        status: 400,
        message: 'Please enter your message',
      });
    }

    const findOne = MessageQuery.getByParentMessageId;
    const replyMsg = MessageQuery.saveMessage;
    const valuesOne = [req.params.parentMessageId];

    try {
      const { rows } = await Pool.query(findOne, valuesOne);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'Message not found',
        });
      }

      const valuesTwo = [
        uuid.v4(),
        new Date().toDateString(),
        new Date().toLocaleTimeString(),
        subject,
        message,
        'sent',
        req.user.email,
        req.user.firstname,
        req.user.lastname,
        receiverEmail,
        req.params.parentMessageId,
        req.user.id,
        'unread',
      ];

      const resultRow = await Pool.query(replyMsg, valuesTwo);
      return res.status(201).send({
        status: 201,
        data: resultRow.rows,
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'Bad Request to the server',
      });
    }
  }
  // delete a message by its ID

  static async deleteById(req, res) {
    const queryText = MessageQuery.deleteById;
    const values = [req.params.id, req.user.id];

    try {
      const { rows } = await Pool.query(queryText, values);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'Message Not Found',
        });
      }
      return res.status(200).send({
        status: 200,
        message: 'Message Deleted',
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'Bad Request to the server',
      });
    }
  }
  // get all messages with draft as a status

  static async getdraftMessages(req, res) {
    const user = req.user.id;
    const queryText = MessageQuery.getDraft;
    const values = [user, 'draft'];

    try {
      const { rows } = await Pool.query(queryText, values);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'No draft messages found',
        });
      }
      return res.status(200).send({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(404).send({
        status: 400,
        message: 'Bad Request to the server',
      });
    }
  }

  // get all sent messages

  static async getSentMessages(req, res) {
    const user = req.user.id;
    const queryText = MessageQuery.getSent;
    const values = [user, 'sent'];

    try {
      const { rows } = await Pool.query(queryText, values);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'No sent messages found',
        });
      }
      return res.status(200).send({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'Bad Request to the server',
      });
    }
  }

  // Resend a message which was drafted

  static async resendMessage(req, res) {
    const findOne = MessageQuery.getAmessage;
    const user = req.user.id;
    const queryText = MessageQuery.resendMessage;
    const values = [req.params.id, user];

    try {
      const { rows } = await Pool.query(findOne, values);
      if (!rows[0]) {
        return res.status(400).send({
          status: 404,
          message: 'Message can not be found',
        });
      }
      const valu = [
        'sent',
        'unread',
        new Date().toDateString(),
        new Date().toLocaleTimeString(),
        req.params.id,
        user,
      ];
      const result = await Pool.query(queryText, valu);
      return res.status(200).send({
        status: 200,
        message: result.rows,
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'Bad request to the server',
      });
    }
  }

  // mark the message as read
  static async markMessageAsRead(req, res) {
    const getOne = MessageQuery.getSingleInboxMessage;
    const updateOne = MessageQuery.readMessage;
    const val = [req.params.id, req.user.email];

    try {
      const { rows } = await Pool.query(getOne, val);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'Message not found',
        });
      }

      const values = [
        'read',
        req.params.id,
        req.user.email,
      ];

      const resultat = await Pool.query(updateOne, values);
      return res.status(200).send({
        status: 200,
        message: 'Marked as read',
        data: resultat.rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        status: 400,
        message: 'Bad Request to the server',
      });
    }
  }
}

export default MessageData;
