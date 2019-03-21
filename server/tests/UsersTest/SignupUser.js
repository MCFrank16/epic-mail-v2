/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/server';
// import create from '../../src/DataBase/DB/testDB';

// before(async () => {
//   await create.createTable()
//     .then(() => { console.log('you are connected'); })
//     .catch((err) => {
//       console.log(err);
//       create.pool.end();
//     });
// });

const { expect } = chai;
const { should } = chai;
chai.use(chaiHttp);

let token;
describe('create a user to the database', () => {
  it('Should create an account', (done) => {
    const user = {
      firstname: 'Bobo',
      lastname: 'NIYO',
      email: 'bobo@gmail.com',
      Phone: '0783200000',
      password: '123456',
      isAdmin: false,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.be.an('Object');
        res.body.should.have.property('status').equal(201);
        res.body.should.have.property('data');
        res.body.data.should.be.an('Array');
        ress.body.data[0].should.all.have.property('token');
        res.body.data[0].should.all.have.property('user');
        res.body.data[0].user.should.have.property('firstname', user.firstname);
        res.body.data[0].user.should.have.property('lastname', user.lastname);
        res.body.data[0].user.should.have.property('email', user.email);
        res.body.data[0].user.should.have.property('phonenumber', user.phoneNumber);
        res.body.data[0].user.should.have.property('isadmin', user.isAdmin);
        done();
      });
  });

  it('Should be able to login', (done) => {
    const login = {
      email: 'bobo@gmail.com',
      password: '123456',
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
        res.body.data[0].should.all.have.property('user');
        res.body.data[0].user.should.have.property('firstname');
        res.body.data[0].user.should.have.property('lastname');
        res.body.data[0].user.should.have.property('othername');
        res.body.data[0].user.should.have.property('email');
        res.body.data[0].user.should.have.property('phonenumber');
        res.body.data[0].user.should.have.property('passporturl');
        res.body.data[0].user.should.have.property('isadmin');
        done();
      });
  });
});
