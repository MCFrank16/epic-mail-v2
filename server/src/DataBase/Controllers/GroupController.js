import uuid from 'uuid';
import moment from 'moment';
import validate from '../Helpers/validate';
import GroupQuery from '../DB/Queries/GroupQuery';
import Pool from '../DB/QueryExecutor';

class Group {
  // post/ create a group
  static async createGroup(req, res) {
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

    const queryText = GroupQuery.createGroup;
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

  static async getAllGroup(req, res) {
    const all = GroupQuery.getAllGroup;

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

  // eslint-disable-next-line consistent-return
  static async updateGroupName(req, res) {
    const findOne = GroupQuery.getAgroupById;
    const updateOne = GroupQuery.updateAgroup;
    const values = [req.params.id, req.user.id];

    try {
      const { rows } = await Pool.query(findOne, values);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'Group not found',
        });
      }
      const valuez = [
        req.body.name,
        req.params.id,
        req.user.id,
      ];

      const result = await Pool.query(updateOne, valuez);
      return res.status(200).send({
        status: 200,
        data: result.rows,
      });
    } catch (err) {
      res.status(400).send({
        status: 400,
        message: err,
      });
    }
  }

  static async deleteGroup(req, res) {
    const queryText = GroupQuery.deleteGroup;
    const values = [req.params.id, req.user.id];

    try {
      const { rows } = await Pool.query(queryText, values);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'Group Not Found',
        });
      }
      return res.status(200).send({
        status: 200,
        message: 'Group Deleted',
      });
    } catch (error) {
      return res.status(404).send({
        status: 404,
        message: error,
      });
    }
  }
}


export default Group;
