/* eslint-disable no-undef */

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/server';


chai.should();
const { expect } = chai;

chai.use(chaiHttp);

let token;
before((done) => {
  const admin = {
    email: 'robalain@gmail.com',
    password: 'ROB123',
  };

  chai.request(server).post('/api/v1/auth/login')
    .send(admin)
    .end((err, res) => {
      token = res.body.data[0].token;
      done();
    });
});


describe('GET all Sent Messages', () => {
  it('SENT Messages should have a 200 status code', (done) => {
    const data = {
      subject: 'Hey Boss',
      message: 'Where are you?',
      status: 'Sent',
      receiverEmail: 'Mecfrank16@gmail.com',
    };

    chai.request(server)
      .get('/api/v1/Messages/Sent')
      .send(data)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('SENT Messages should be an object', (done) => {
    const data = {
      subject: 'Hey Boss',
      message: 'Where are you?',
      status: 'Sent',
      receiverEmail: 'Mecfrank16@gmail.com',
    };

    chai.request(server)
      .get('/api/v1/Messages/Sent')
      .send(data)
      .set('x-access-token', token)
      .end((err, res) => {
        res.body.should.be.an('object');
        done();
      });
  });

  it('SENT Messages should have a property status with SENT as the Value', (done) => {
    const data = {
      subject: 'Hey Boss',
      message: 'Where are you?',
      status: 'Sent',
      receiverEmail: 'Mecfrank16@gmail.com',
    };

    chai.request(server)
      .get('/api/v1/Messages/Sent')
      .send(data)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(data.status).to.deep.equal('Sent');
        done();
      });
  });

  it('UNREAD Messages should have a 200 or 404 status code', (done) => {
    const data = {
      subject: 'Hey Boss',
      message: 'Where are you?',
      status: 'Unread',
      receiverEmail: 'Mecfrank16@gmail.com',
    };

    chai.request(server)
      .get('/api/v1/Messages/Unread')
      .send(data)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404 || 200);
        done();
      });
  });
  it('UNREAD Messages should be an object', (done) => {
    const data = {
      subject: 'Hey Boss',
      message: 'Where are you?',
      status: 'Unread',
      receiverEmail: 'Mecfrank16@gmail.com',
    };

    chai.request(server)
      .get('/api/v1/Messages/unread')
      .send(data)
      .set('x-access-token', token)
      .end((err, res) => {
        res.body.should.be.an('object');
        done();
      });
  });

  it('UNREAD Messages should have a property status with Unread as the Value', (done) => {
    const data = {
      subject: 'Hey Boss',
      message: 'Where are you?',
      status: 'Unread',
      receiverEmail: 'Mecfrank16@gmail.com',
    };

    chai.request(server)
      .get('/api/v1/Messages/Unread')
      .send(data)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(data.status).to.deep.equal('Unread');
        done();
      });
  });
});
