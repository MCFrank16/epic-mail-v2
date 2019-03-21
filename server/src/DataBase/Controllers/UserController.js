import Auth from '../Helpers/validate';
import Users from '../Models/UserModel';
import queries from '../DB/Queries/UsersQuery';
import Pool from '../DB/QueryExecutor';

class UserController {
  static async registerUser(req, res) {
    const newUser = Users.createUser(req.body);
    const token = Auth.generateToken(req.body.id);
    newUser.then((user) => {
      if (!user) {
        return res.status(400).send({
          status: 400,
          message: 'The user already exists',
        });
      }
      const uza = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        isAdmin: user.isadmin,
        Phone: user.phone,
      };
      return res.status(201).send({
        status: 201,
        data: {
          token,
          uza,
        },
      });
    });
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        status: 400,
        message: 'please enter all the required fields',
      });
    }
    if (!Auth.emailValidation(email)) {
      return res.status(400).send({
        status: 400,
        message: 'please enter a valid email',
      });
    }
    const query = queries.loginUser;
    const values = [email];
    try {
      const { rows } = await Pool.query(query, values);
      if (!rows[0]) {
        return res.status(400).send({
          status: 400,
          message: 'The credentials provided are not valid',
        });
      }
      if (!Auth.comparePassword(password, rows[0].password)) {
        return res.send({
          status: 400,
          message: 'Please enter the password you provided on signup process',
        });
      }
      const token = Auth.generateToken(rows[0].id);
      return res.status(200).send({
        status: 200,
        data: [{ token }],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: error,
      });
    }
  }
}

export default UserController;
