import uuid from 'uuid';
import moment from 'moment';
// import validate from '../Helpers/validate';
import GroupMemberQuery from '../DB/Queries/GroupMemberQuery';
import GroupQuery from '../DB/Queries/GroupQuery';
import Pool from '../DB/QueryExecutor';

class GroupMember {
  static async addUsertoGroup(req, res) {
    const findOneGroup = GroupQuery.getAgroupById;
    const insertUser = GroupMemberQuery.addUserToGroup;
    const values = [req.params.id, req.user.id];

    try {
      const { rows } = await Pool.query(findOneGroup, values);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'Group not found',
        });
      }

      const valuez = [
        uuid.v4(),
        req.body.userId,
        req.body.userRole,
        req.user.id,
        moment(new Date()),
      ];

      const result = await Pool.query(insertUser, valuez);
      return res.status(200).send({
        status: 200,
        data: result.rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(404).send({
        status: 404,
        message: err,
      });
    }
  }

  static async deleteGroup(req, res) {
    const findOneGroup = GroupQuery.getAgroupById;
    const deleteGroup = GroupMemberQuery.deleteUserToGroup;
    const values = [req.params.groupid, req.user.id];
    console.log(values);
    try {
      const { rows } = await Pool.query(findOneGroup, values);
      // console.log(rows);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'Group not found',
        });
      }

      const valuez = [
        req.params.id,
        req.user.id,
      ];
      try {
        const result = await Pool.query(deleteGroup, valuez);
        console.log(result);
        if (!result) {
          return res.status(404).send({
            status: 404,
            message: 'User Not deleted',
          });
        }
        return res.status(200).send({
          status: 200,
          message: 'User Deleted',
        });
      } catch (err) {
        return res.status(404).send({
          status: 404,
          message: err,
        });
      }
    } catch (err) {
      return res.status(404).send({
        status: 404,
        message: err,
      });
    }
  }
}

export default GroupMember;
