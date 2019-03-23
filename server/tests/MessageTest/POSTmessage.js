/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid';
import moment from 'moment';
import app from '../../src/server';

const { should } = chai;
const { expect } = chai;

chai.use(chaiHttp);
let token;

before((done) => {
  const admin = {
    email: 'ClaudeManziy@gmail.com',
    password: 'ROB123',
  };

  chai.request(app)
    .post('/api/v1/auth/login')
    .send(admin)
    .end((err, res) => {
      token = res.body.data[0].token;
      done();
    });
});

describe('Post Messages', () => {
//   it('should create a message', (done) => {
//     chai.request(app)
//       .post('/api/v1/messages')
//       .send({
//         subject: 'javascript',
//         message: 'let us learn javascript',
//         status: 'read',
//         receiveremail: 'robalain@gmail.com',
//       })
//       .set('x-access-token', token)
//       .end((err, res) => {
//         console.log(res.body);
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('data');
//         expect(res.body).to.have.property('status').equal(201);
//         expect(res.body.data).to.be.an('object');
//         expect(res.body.data).to.have.property('subject', subject);
//         expect(res.body.data).to.have.property('message', message);
//         expect(res.body.data).to.have.property('status');
//         expect(res.body.data).to.have.property('receiveremail', receiveremail);

//         done();
//       });
//   });

  it('should check for the 3 required fields', (done) => {
    chai.request(app)
      .post('/api/v1/Messages')
      .send({
        subject: '',
        message: '',
        receiverEmail: '',
        status: '',
      })
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body).to.have.property('status').equal(400);
        expect(res.body).to.have.property('message').equal('Please fill in all the requirements');

        done();
      });
  });
});
