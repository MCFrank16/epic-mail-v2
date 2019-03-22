/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid';
import { access } from 'fs';
import app from '../../src/server';


const { expect } = chai;

chai.use(chaiHttp);

let token;

const dummy = {
  subject: 'Hey Sir!!',
  message: 'Sir Bimeze bite?',
  status: 'read',
  receiverEmail: 'Mecfrank16@gmail.com',
};

before((done) => {
  const admin = {
    email: 'KamIssa@gmail.com',
    password: '654321',
  };

  chai.request(app).post('/api/v1/auth/login')
    .send(admin)
    .end((err, res) => {
      token = res.body.data[0].token;
      done();
    });
});

describe('Post Messages', () => {
  it('should save an email and send a 201 status', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .send(dummy)
      .set('x-access-token', token)
      .end((err, res) => {
        res.body.should.have.status(201);
        done();
      });
  });

  it('should save an email as an new object', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .send(dummy)
      .end((err, res) => {
        res.body.should.have.an('object');
        done();
      });
  });

  it('should have 9 property', (done) => {
    chai.request(app)
      .post('/api/v1/messages')
      .send(dummy)
      .set('x-access-token', token)
      .end((err, res) => {
        res.body.should.have.property('data');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('createdon');
        expect(res.body.data).to.have.property('subject');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data).to.have.property('status');
        expect(res.body.data).to.have.property('receiveremail');
        expect(res.body.data).to.have.property('parentmessageid');
        expect(res.body.data).to.have.property('senderid');
        expect(res.body.data).to.have.property('receiverid');

        done();
      });
  });
});
