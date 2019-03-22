/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import validators from '../src/DataBase/Helpers/validate';

const { expect } = chai;
chai.use(chaiHttp);
let token;

before((done) => {
  const admin = {
    email: 'robalain@gmail.com',
    password: 'ROB123',
  };

  chai.request(app).post('/api/v1/auth/login')
    .send(admin)
    .end((err, res) => {
      token = res.body.data[0].token;
      done();
    });
});


describe('It should test the validator class', () => {
  it('should ask a user to enter a subject', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .send({
        subject: '',
        message: 'Hey',
        receiverEmail: 'mecfrank@gmail.com',
      })
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body).to.have.property('status').to.eql(400);
        expect(res.body).to.have.property('message').to.eql('Please fill in all the requirements');
        done();
      });
  });

  it('should ask a user to enter a message', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .send({
        subject: 'Hey',
        message: '',
        receiverEmail: 'mecfrank@gmail.com',
      })
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body).to.have.property('status').to.eql(400);
        expect(res.body).to.have.property('message').to.eql('Please fill in all the requirements');
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
    const token = validators.generateToken(id);
    expect(token).to.be.a('string');
    expect(token).to.equal(token);
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
