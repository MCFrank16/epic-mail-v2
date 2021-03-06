import uuid from 'uuid';
import moment from 'moment';
import validate from '../Helpers/validate';
import GroupQuery from '../DB/Queries/GroupQuery';
import GroupMemberQuery from '../DB/Queries/GroupMemberQuery';
import GroupMessage from '../DB/Queries/GroupMessageQuery';
import Pool from '../DB/QueryExecutor';

class GroupMember {
  static async addUsertoGroup(req, res) {
    const findaGroup = GroupQuery.getAgroupById;
    const groupMember = GroupMemberQuery.addUserToGroup;
    const values = [req.params.groupId, req.user.id];
    try {
      const { rows } = await Pool.query(findaGroup, values);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'Group is not found',
        });
      }

      const { memberemail } = req.body;
      if (!memberemail) {
        return res.status(400).send({
          status: 400,
          message: 'Please fill in all the requirements',
        });
      }

      const savername = `${req.user.firstname} ${req.user.lastname}`;

      const valeur = [
        uuid.v4(),
        memberemail,
        savername,
        req.user.id,
        req.params.groupId,
        new Date().toLocaleDateString(),
      ];

      const result = await Pool.query(groupMember, valeur);

      return res.status(201).send({
        status: 201,
        data: result.rows[0],
      });
    } catch (err) {
      console.log(err);
      return res.status(404).send({
        status: 404,
        message: 'Bad request to the server',
      });
    }
  }

  static async deleteUsertoGroup(req, res) {
    const findaGroup = GroupQuery.getAgroupById;
    const groupMember = GroupMemberQuery.deleteUserToGroup;
    const values = [req.params.groupId, req.user.id];
    try {
      const result = await Pool.query(findaGroup, values);
      if (result < 0) {
        return res.status(404).send({
          status: 404,
          message: 'Group is not found',
        });
      }
      const mEmail = req.body.memberemail;
      if (!mEmail) {
        return res.status(404).send({
          status: 404,
          message: 'Please fill in the email',
        });
      }
      const valeur = [
        req.params.groupId,
        mEmail,
        req.user.id,
      ];

      const { rows } = await Pool.query(groupMember, valeur);
      if (rows.length > 0) {
        return res.status(200).send({
          status: 200,
          message: 'Member Deleted',
        });
      }
      return res.status(404).send({
        status: 404,
        message: 'Member does not exist',
      });
    } catch (err) {
      console.log(err);
      return res.status(404).send({
        status: 404,
        message: 'Bad request to the server',
      });
    }
  }

  static async addMessageToGroup(req, res) {
    const { subject, message } = req.body;
    const findaGroup = GroupQuery.getAgroupById;
    const groupMember = GroupMessage.addMessage;
    const values = [req.params.groupId, req.user.id];
    try {
      const result = await Pool.query(findaGroup, values);
      if (result < 0) {
        return res.status(404).send({
          status: 404,
          message: 'Group is not found',
        });
      }

      const valeur = [
        uuid.v4(),
        new Date().toLocaleDateString(),
        subject,
        message,
        'sent',
        uuid.v4(),
        req.params.groupId,
        req.user.id,
      ];

      const { rows } = await Pool.query(groupMember, valeur);
      if (rows.length > 0) {
        return res.status(201).send({
          status: 201,
          message: rows[0],
        });
      }
      return res.status(400).send({
        status: 400,
        message: 'Message not sent',
      });
    } catch (err) {
      console.log(err);
      return res.status(404).send({
        status: 404,
        message: 'Bad request to the server',
      });
    }
  }

  static async draftMessageToGroup(req, res) {
    const { subject, message } = req.body;
    const findaGroup = GroupQuery.getAgroupById;
    const groupMember = GroupMessage.addMessage;
    const values = [req.params.groupId, req.user.id];
    try {
      const result = await Pool.query(findaGroup, values);
      if (result < 0) {
        return res.status(404).send({
          status: 404,
          message: 'Group is not found',
        });
      }

      const valeur = [
        uuid.v4(),
        new Date().toLocaleDateString(),
        subject,
        message,
        'draft',
        uuid.v4(),
        req.params.groupId,
        req.user.id,
      ];

      const { rows } = await Pool.query(groupMember, valeur);
      if (rows.length > 0) {
        return res.status(201).send({
          status: 201,
          message: rows[0],
        });
      }
      return res.status(400).send({
        status: 400,
        message: 'Message not sent',
      });
    } catch (err) {
      console.log(err);
      return res.status(404).send({
        status: 404,
        message: 'Bad request to the server',
      });
    }
  }
}


export default GroupMember;
