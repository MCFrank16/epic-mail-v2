/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/server';
import validators from '../../src/DataBase/Helpers/validate';

const { expect } = chai;
const { should } = chai;
chai.use(chaiHttp);

describe('create a user to the database', () => {
  it('Should create an account', (done) => {
    const user = {
      firstname: 'Claudine',
      lastname: 'nyinawugabo',
      email: 'nyinawuclau@gmail.com',
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
      email: 'nyinawuclau@gmail.com',
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

  it('should hash the password and return the string ', (done) => {
    const password = '123frank';
    const result = validators.hashPassword(password);
    expect(result).to.equal(result);
    expect(result).to.be.a('string');
    done();
  });

  it('should compare the entered password to not equal to the hashed password', (done) => {
    const password = '123frank';
    const hashPassword = validators.hashPassword(password);
    const result = validators.comparePassword(hashPassword, password);
    expect(result).to.equal(false);
    done();
  });

  it('should generate the token', (done) => {
    const id = '763445dfd';
    const tokeni = validators.generateToken(id);
    expect(tokeni).to.be.a('string');
    expect(tokeni).to.equal(tokeni);
    done();
  });

  it('should validate a name', (done) => {
    const namePattern = /^[a-zA-Z]{5,}[a-zA-Z ]*$/;
    const name = 'Frank';
    const result = namePattern.test(name);
    expect(name).to.be.a('string');
    expect(result).to.eql(true);
    done();
  });

  it('should validate a Username', (done) => {
    const namePattern = /^[a-zA-Z]{1,10}[a-zA-Z ]*$/;
    const name = 'MUFrank';
    const result = namePattern.test(name);
    expect(name).to.be.a('string');
    expect(result).to.eql(true);
    done();
  });

  // it.only('should validate a Phone Number', (done) => {
  //   const namePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  //   // eslint-disable-next-line radix
  //   const name = Number('0788554548');

  //   const result = namePattern.test(name);
  //   expect(name).to.be.a(Number);
  //   expect(result).to.eql(true);
  //   done();
  // });
});
