import uuid from 'uuid';
import moment from 'moment';
import validate from '../Helpers/validate';
import GroupQuery from '../DB/Queries/GroupQuery';
import Pool from '../DB/QueryExecutor';

class GroupMessage {
  // post/ create a message
  static async postGroup(req, res) {
    const {
      name, role,
    } = req.body;

    if (!name || !role) {
      return res.status(400).send({
        status: 400,
        message: 'Please fill in all the requirements',
      });
    }

    if (!validate.validateName(name)) {
      return res.status(400).send({
        status: 400,
        message: 'Please enter a valid name',
      });
    }

    if (!validate.validateName(role)) {
      return res.status(400).send({
        status: 400,
        message: 'Please enter a valid role',
      });
    }

    const queryText = GroupQuery.createGroupMessage;
    const values = [
      uuid.v4(),
      name,
      role,
      req.user.id,
      moment(new Date()),
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
        message: error,
      });
    }
  }

  static async getAllGroupMessages(req, res) {
    const all = GroupQuery.getAllGroupMessage;

    try {
      const { rows, rowCount } = await Pool.query(all, [req.user.id]);
      return res.status(200).send({
        status: 200,
        data: rows,
        rowCount,
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: error,
      });
    }
  }

  //   static async getMessageById(req, res) {
  //     const queryText = MessageQuery.getById;
  //     const values = [req.params.id, req.user.id];
  //     try {
  //       const { rows } = await Pool.query(queryText, values);
  //       if (!rows) {
  //         return res.send({
  //           status: 404,
  //           message: 'Message not found',
  //         });
  //       }
  //       return res.send({
  //         status: 200,
  //         data: rows[0],
  //       });
  //     } catch (error) {
  //       return res.send({
  //         status: 400,
  //         message: error,
  //       });
  //     }
  //   }

  //   static async deleteById(req, res) {
  //     const queryText = MessageQuery.deleteById;
  //     const values = [req.params.id, req.user.id];

  //     try {
  //       const { rows } = await Pool.query(queryText, values);
  //       if (!rows[0]) {
  //         return res.send({
  //           status: 404,
  //           message: 'Message Not Found',
  //         });
  //       }
  //       return res.send({
  //         status: 200,
  //         message: 'Message Deleted',
  //       });
  //     } catch (error) {
  //       return res.send({
  //         status: 404,
  //         message: error,
  //       });
  //     }
  //   }

  //   static async getUnreadMessages(req, res) {
  //     const queryText = MessageQuery.getUnread;
  //     const values = ['unread'];

  //     try {
  //       const { rows } = await Pool.query(queryText, values);
  //       if (!rows[0]) {
  //         return res.send({
  //           status: 404,
  //           message: 'No unread messages found',
  //         });
  //       }
  //       return res.send({
  //         status: 200,
  //         data: [rows],
  //       });
  //     } catch (error) {
  //       return res.send({
  //         status: 404,
  //         message: error,
  //       });
  //     }
  //   }

  //   static async getSentMessages(req, res) {
  //     const queryText = MessageQuery.getSent;
  //     const values = ['sent'];

//     try {
//       const { rows } = await Pool.query(queryText, values);
//       if (!rows[0]) {
//         return res.send({
//           status: 404,
//           message: 'No sent messages found',
//         });
//       }
//       return res.send({
//         status: 200,
//         data: [rows],
//       });
//     } catch (error) {
//       return res.send({
//         status: 404,
//         message: error,
//       });
//     }
//   }
}


export default GroupMessage;
