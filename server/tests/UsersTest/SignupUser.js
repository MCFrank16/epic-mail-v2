/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/server';

const { expect } = chai;
const { should } = chai;
chai.use(chaiHttp);

describe('create a user to the database', () => {
  it('Should create an account', (done) => {
    const user = {
      firstname: 'Claudine',
      lastname: 'Manzukic',
      email: 'ClaudManzukic@gmail.com',
      password: 'ROB123',
      isAdmin: true,
      Phone: '0783200000',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        console.log(res.body);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('status').equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('Object');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('user');
        expect(res.body.data.user).to.have.property('firstname', user.firstname);
        expect(res.body.data.user).to.have.property('lastname', user.lastname);
        expect(res.body.data.user).to.have.property('email', user.email);
        expect(res.body.data.user).to.have.property('Phone', user.Phone);
        expect(res.body.data.user).to.have.property('isAdmin', user.isAdmin);
        done();
      });
  });

  it('Should be able to login', (done) => {
    const login = {
      email: 'ClaudManzukic@gmail.com',
      password: 'ROB123',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(login)
      .end((err, res) => {
        console.log(res.body);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('status').equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data[0]).to.have.property('token');
        done();
      });
  });
});
