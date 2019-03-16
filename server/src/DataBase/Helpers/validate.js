import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Validate {
  static emailValidation(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // ^[\w.-]+@[\w.-]+[a-zA-Z]{2,4}$
    return emailPattern.test(email) && email;
  }

  static messageValidation(message) {
    const stringPattern = /^.{1,250}$/;

    return stringPattern.test(message.trim());
  }

  static subjectValidation(subject) {
    const stringPattern = /^.{1,15}$/;
    return stringPattern.test(subject.trim());
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(hashPassword, password);
  }

  static generateToken(id) {
    const token = jwt.sign({
      userId: id,
    },
    process.env.SECRET, { expiresIn: '1d' });

    return token;
  }
}

export default Validate;
