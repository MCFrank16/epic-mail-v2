/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/server';

const { expect } = chai;
chai.use(chaiHttp);

describe('create a user to the database', () => {
  it('Should create an account', (done) => {
    const user = {
      firstname: 'Isagy',
      lastname: 'Kamgsy',
      email: 'Kamysjsa@gmail.com',
      password: '654321',
      isAdmin: 'true',
      Phone: '0783200000',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('Object');
        expect(res.body).to.have.property('status').equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('Object');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('uza');
        res.body.data.uza.should.have.property('firstname', user.firstname);
        res.body.data.uza.should.have.property('lastname', user.lastname);
        res.body.data.uza.should.have.property('email', user.email);
        res.body.data.uza.should.have.property('Phone', user.Phone);
        res.body.data.uza.should.have.property('isAdmin').to.eql('true');
        done();
      });
  });

  it('Should be able to login', (done) => {
    const login = {
      email: 'KamIssa@gmail.com',
      password: '654321',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(login)
      .end((err, res) => {
        res.body.should.be.an('Object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('data');
        res.body.data.should.be.an('Array');
        res.body.data[0].should.have.property('token');
        done();
      });
  });
});
