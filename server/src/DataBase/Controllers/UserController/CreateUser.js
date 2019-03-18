import Auth from '../../Helpers/validate';
import Users from '../../Models/UserModel';


class UserController {
  static async registerUser(req, res) {
    const newUser = Users.createUser(req.body);
    const token = Auth.generateToken(req.body.id);
    newUser.then((done) => {
      if (!done) {
        return res.send({
          status: 400,
          message: 'The user already exists',
        });
      }
      return res.send({
        status: 201,
        data: [{
          token,
          done,
        }],
      });
    });
  }
}

export default UserController;
