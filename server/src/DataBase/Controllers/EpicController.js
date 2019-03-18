import uuid from 'uuid';
// import { Messages, db } from '../Models/EpicMessages';
import validate from '../Helpers/validate';

class MessageData {
  // get all the messages
  static getAllMessages(req, res) {
    const allMessages = db.epicMessages;
    res.send({
      status: 200,
      data: allMessages,
    });
  }

  // post/ create a message
  static postMessage(req, res) {
    const {
      message, subject, receiverEmail, status,
    } = req.body;

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

    const newPost = new Messages({
      id: uuid.v4(),
      createdOn: new Date().toDateString(),
      subject: subject.trim(),
      message: message.trim(),
      status: 'sent',
      parentMessageId: uuid.v4(),
      senderId: uuid.v4(),
      receiverId: uuid.v4(),
      receiverEmail,
    });

    db.addMessage(newPost);

    // epicMessages.push(newPost);
    return res.send({
      status: 201,
      data: newPost,
    });
  }

  static getUnreadMessages(req, res) {
    let unreadMessages = {
      status: 200,
      data: [],
    };
    const unRead = db.getUnread(req.params);
    if (!unRead.length) {
      unreadMessages = {
        status: 404,
        message: 'No unread message found',
      };
    } else {
      unreadMessages.data = unRead;
    }
    return res.send(unreadMessages);
  }

  static getSentMessages(req, res) {
    let sentMessages = {
      status: 200,
      data: [],
    };
    const unRead = db.getSent(req.params);
    if (!unRead.length) {
      sentMessages = {
        status: 404,
        message: 'No sent message found',
      };
    } else {
      sentMessages.data = unRead;
    }
    return res.send(sentMessages);
  }

  static getByMessageId(req, res) {
    const { id } = req.params;
    let byIdMessages = {
      status: 200,
      data: {},
    };
    const result = db.getById(id);
    if (!result) {
      byIdMessages = {
        status: 404,
        message: 'No Message found with such ID',
      };
    } else {
      byIdMessages = {
        status: 200,
        data: result,
      };
    }
    return res.send(byIdMessages);
  }


  static deleteMessageById(req, res) {
    const { id } = req.params;
    let deleteMessages = {
      status: 200,
      data: {},
    };
    const result = db.deleteById(id);
    if (!result) {
      deleteMessages = {
        status: 404,
        message: 'No Message found with such ID',
      };
    } else {
      deleteMessages = {
        status: 200,
        message: 'Message Deleted',
      };
    }
    return res.send(deleteMessages);
  }
}


export default MessageData;
