/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import userQuery from '../DB/Queries/UsersQuery';
import Pool from '../DB/QueryExecutor';

// eslint-disable-next-line no-undef
const CheckToken = {
  async validateToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.send({
        status: 400,
        message: 'please login in first',
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const querytext = userQuery.getUser;

      const { rows } = await Pool.query(querytext, [decoded.userId]);
      if (!rows[0]) {
        return res.send({
          status: 400,
          message: 'Failed to authenticate',
        });
      }
      req.user = { id: decoded.userId };
      next();
      return true;
    } catch (error) {
      return res.send({
        status: 404,
        message: error,
      });
    }
  },
};

export default CheckToken;
