/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';
import validators from '../src/DataBase/Helpers/validate';

const { expect } = chai;
chai.use(chaiHttp);

describe('It should test the validator class', () => {
  it('should ask a user to enter a subject', (done) => {
    chai.request(server)
      .post('/api/v1/messages')
      .send({
        subject: '',
        message: 'Hey',
        receiverEmail: 'mecfrank@gmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.have.property('status').to.eql(400);
        expect(res.body).to.have.property('message').to.eql('Please enter the subject');
        done();
      });
  });

  it('should ask a user to enter a message', (done) => {
    chai.request(server)
      .post('/api/v1/messages')
      .send({
        subject: 'Hey',
        message: '',
        receiverEmail: 'mecfrank@gmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.have.property('status').to.eql(400);
        expect(res.body).to.have.property('message').to.eql('Please enter your message');
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
});
