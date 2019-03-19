import uuid from 'uuid';
import moment from 'moment';
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
      'sent',
      receiverEmail,
      uuid.v4(),
      uuid.v4(),
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
      const { rows, rowCount } = await Pool.query(all);
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
}


export default MessageData;
