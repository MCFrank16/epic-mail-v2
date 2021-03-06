import Auth from '../Helpers/validate';
import Users from '../Models/UserModel';
import queries from '../DB/Queries/UsersQuery';
import Pool from '../DB/QueryExecutor';

class UserController {
  static async registerUser(req, res) {
    const newUser = Users.createUser(req.body);
    newUser.then((uza) => {
      if (!uza) {
        return res.status(400).send({
          status: 400,
          message: 'Sorry!!! we already have these details in our database',
        });
      }

      const token = Auth.generateToken(uza.id);
      const user = {
        id: uza.id,
        firstname: uza.firstname,
        lastname: uza.lastname,
        email: uza.email,
        isAdmin: uza.isadmin,
        Phone: uza.phone,
      };
      return res.status(201).send({
        status: 201,
        data: {
          token,
          user,
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
          message: 'OOOps, Please create an account!!!',
        });
      }
      if (!Auth.comparePassword(password, rows[0].password)) {
        return res.send({
          status: 400,
          message: 'Something is wrong with your credentials!!!',
        });
      }
      const token = Auth.generateToken(rows[0].id, rows[0].email, rows[0].firstname, rows[0].lastname);
      
      const result = {
        userRole: rows[0].isadmin,
        userEmail: rows[0].email,
        userFirstname: rows[0].firstname,
        userLastname: rows[0].lastname,
        userId: rows[0].id,
      };

      return res.status(200).send({
        status: 200,
        token,
        result,
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: error,
      });
    }
  }

  static async selectEmails(req, res) {
    const queryText = queries.selectEmails;

    try {
      const { rows } = await Pool.query(queryText);
      if (!rows) {
        return res.status(404).send({
          status: 404,
          message: 'any emails found',
        });
      }
      return res.status(200).send({
        status: 200,
        data: rows,
      });
    } catch (err) {
      return res.status(400).send({
        status: 400,
        message: 'Bad request to the server',
      });
    }
  }
}

export default UserController;
