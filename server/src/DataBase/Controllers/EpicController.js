import uuid from 'uuid';
import moment from 'moment';
import validate from '../Helpers/validate';
import MessageQuery from '../DB/Queries/MessageQuery';
import Pool from '../DB/QueryExecutor';

class MessageData {
  // post/ create a message
  static async postMessage(req, res) {
    const {
      message, subject, receiverEmail, status,
    } = req.body;

    if (!message || !subject || !receiverEmail) {
      return res.send({
        status: 400,
        message: 'Please fill in all the requirements',
      });
    }

    if (!validate.emailValidation(receiverEmail)) {
      return res.send({
        status: 400,
        message: 'Please enter a valid Email',
      });
    }

    if (!validate.subjectValidation(subject)) {
      return res.send({
        status: 400,
        message: 'Please enter the subject',
      });
    }

    if (!validate.messageValidation(message)) {
      return res.send({
        status: 400,
        message: 'Please enter your message',
      });
    }

    const queryText = MessageQuery.saveMessage;
    const values = [
      uuid.v4(),
      moment(new Date()),
      subject,
      message,
      status,
      receiverEmail,
      uuid.v4(),
      req.user.id,
      uuid.v4(),
    ];

    try {
      const { rows } = await Pool.query(queryText, values);
      return res.send({
        status: 201,
        data: rows[0],
      });
    } catch (error) {
      return res.send({
        status: 400,
        message: error,
      });
    }
  }

  static async getAllMessages(req, res) {
    const all = MessageQuery.getAllMessages;

    try {
      const { rows, rowCount } = await Pool.query(all, [req.user.id]);
      console.log(req.user.id);
      return res.send({
        status: 201,
        data: rows,
        rowCount,
      });
    } catch (error) {
      return res.send({
        status: 400,
        message: error,
      });
    }
  }

  static async getMessageById(req, res) {
    const queryText = MessageQuery.getById;
    const values = [req.params.id, req.user.id];
    try {
      const { rows } = await Pool.query(queryText, values);
      if (!rows) {
        return res.send({
          status: 404,
          message: 'Message not found',
        });
      }
      return res.send({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.send({
        status: 400,
        message: error,
      });
    }
  }

  static async deleteById(req, res) {
    const queryText = MessageQuery.deleteById;
    const values = [req.params.id, req.user.id];

    try {
      const { rows } = await Pool.query(queryText, values);
      if (!rows[0]) {
        return res.send({
          status: 404,
          message: 'Message Not Found',
        });
      }
      return res.send({
        status: 200,
        message: 'Message Deleted',
      });
    } catch (error) {
      return res.send({
        status: 404,
        message: error,
      });
    }
  }

  static async getUnreadMessages(req, res) {
    const { user } = req.user.id;
    const queryText = MessageQuery.getUnread;
    const values = [user, 'unread'];

    try {
      const { rows } = await Pool.query(queryText, values);
      if (!rows[0]) {
        return res.send({
          status: 404,
          message: 'No unread messages found',
        });
      }
      return res.send({
        status: 200,
        data: [rows],
      });
    } catch (error) {
      return res.send({
        status: 404,
        message: error,
      });
    }
  }

  static async getSentMessages(req, res) {
    const user = req.user.id;
    const queryText = MessageQuery.getSent;
    const values = [user, 'sent'];

    try {
      const { rows } = await Pool.query(queryText, values);
      if (!rows[0]) {
        return res.send({
          status: 404,
          message: 'No sent messages found',
        });
      }
      return res.send({
        status: 200,
        data: [rows],
      });
    } catch (error) {
      return res.send({
        status: 404,
        message: error,
      });
    }
  }
}


export default MessageData;
