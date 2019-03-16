/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'chai-uuid';
import date from 'chai-datetime';
import server from '../../src/server';
import { Messages } from '../../src/DataBase/Models/EpicMessages';

const { should } = chai;
const { expect } = chai;

chai.use(chaiHttp);
chai.use(uuid);
chai.use(date);

describe('GET a message by its specific ID', (done) => {
  let id;
  beforeEach((done) => {
    chai.request(server)
      .post('/api/v1/Messages')
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
      .end((err, res) => {
        expect(res.body.status).to.eql(200);
        done();
      });
  });

  it('should return the object', (done) => {
    chai.request(server)
      .get('/api/v1/Messages/:id')
      .end((err, res) => {
        res.body.should.be.an('object');
        done();
      });
  });

  it('should have a full body response with 9 properties', (done) => {
    chai.request(server)
      .get(`/api/v1/Messages/${id}`)

      .end((err, res) => {
        if (id) {
          expect(res.body.data).to.have.property('id').to.be.a.uuid('v4');
          expect(res.body.data).to.have.property('createdOn').to.be.a('string');
          expect(res.body.data).to.have.property('subject').to.be.a('string');
          expect(res.body.data).to.have.property('message').to.be.a('string');
          expect(res.body.data).to.have.property('status').to.be.a('string');
          expect(res.body.data).to.have.property('parentMessageId').to.be.a.uuid('v4');
          expect(res.body.data).to.have.property('senderId').to.be.a.uuid('v4');
          expect(res.body.data).to.have.property('receiverId').to.be.a.uuid('v4');
          expect(res.body.data).to.have.property('receiverEmail').to.be.a('string');
        }
        done();
      });
  });

  it('should send no Message found', (done) => {
    const id = 1;
    chai.request(server)
      .get(`/api/v1/Messages/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('No Message found with such ID');
        done();
      });
  });
});
