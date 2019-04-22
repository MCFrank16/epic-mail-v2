/* eslint-disable class-methods-use-this */
import uuid from 'uuid';
import moment from 'moment';
import Pool from '../DB/QueryExecutor';
import Auth from '../Helpers/validate';
import UsersQuery from '../DB/Queries/UsersQuery';

class User {
  async createUser(dataBody) {
    const queryText = UsersQuery.saveUser;
    const password = Auth.hashPassword(dataBody.password);
    const values = [
      uuid.v4(),
      dataBody.firstname,
      dataBody.lastname,
      dataBody.email,
      password,
      moment(new Date()),
      moment(new Date()),
      dataBody.isAdmin === 'false',
      dataBody.Phone,
    ];
    try {
      const { rows } = await Pool.query(queryText, values);
      return rows[0];
    } catch (error) {
      return false;
    }
  }
}

export default new User();
