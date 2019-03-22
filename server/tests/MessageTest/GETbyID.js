/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'chai-uuid';
import server from '../../src/server';


const { expect } = chai;

chai.use(chaiHttp);
chai.use(uuid);

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


describe('GET a message by its specific ID', () => {
  let id;
  beforeEach((done) => {
    chai.request(server)
      .post('/api/v1/Messages')
      .set('x-access-token', token)
      .send({
        subject: 'Hey There',
        message: 'Hey I miss you',
        status: 'Read',
        receiverEmail: 'Mecfrank@yahoo.fr',
      })
      .end((err, res) => {
        id = res.body.data.id;
        done();
      });
  });

  it('should return a status code of 200', (done) => {
    chai.request(server)
      .get(`/api/v1/Messages/${id}`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body.status).to.eql(200);
        done();
      });
  });

  it('should return the object', (done) => {
    chai.request(server)
      .get('/api/v1/Messages/:id')
      .set('x-access-token', token)
      .end((err, res) => {
        res.body.should.be.an('object');
        done();
      });
  });

  it('should have a full body response with 9 properties', (done) => {
    chai.request(server)
      .get(`/api/v1/Messages/${id}`)
      .set('x-access-token', token)
      .end((err, res) => {
        if (id) {
          expect(res.body.data).to.have.property('id').to.be.a.uuid('v4');
          expect(res.body.data).to.have.property('createdon').to.be.a('string');
          expect(res.body.data).to.have.property('subject').to.be.a('string');
          expect(res.body.data).to.have.property('message').to.be.a('string');
          expect(res.body.data).to.have.property('status').to.be.a('string');
          expect(res.body.data).to.have.property('parentmessageid').to.be.a.uuid('v4');
          expect(res.body.data).to.have.property('senderid').to.be.a.uuid('v4');
          expect(res.body.data).to.have.property('receiverid').to.be.a.uuid('v4');
          expect(res.body.data).to.have.property('receiveremail').to.be.a('string');
        }
        done();
      });
  });
});
