/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid';
import server from '../../src/server';
import User from '../../src/DataBase/Models/UserModel';
import Auth from '../../src/DataBase/Helpers/validate';

chai.use(chaiHttp);
const { expect } = chai;

describe.only('Sign up the user', () => {
  it('should check for the 201 status on success', (done) => {
    const dummy = {
      id: uuid.v4(),
      firstname: 'Robert',
      lastname: 'Cyusa',
      email: 'robalain2020@gmail.com',
      password: Auth.hashPassword('fra334'),
      createdon: new Date().toDateString(),
      updatedon: new Date().toDateString(),
      isAdmin: 'true',
      Phone: '07889878764',

    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(dummy)
      .end((err, res) => {
        expect(res.body).to.have.status(201);
        done();
      });
  });
});
