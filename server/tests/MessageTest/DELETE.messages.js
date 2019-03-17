/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/server';

const { expect } = chai;

chai.use(chaiHttp);

// eslint-disable-next-line no-undef
describe('Delete Messages by ID', () => {
  let id;
  // eslint-disable-next-line no-undef
  beforeEach((done) => {
    chai.request(server)
      .post('/api/v1/messages')
      .send({
        subject: 'Hey There',
        message: 'Hey I miss you',
        receiverEmail: 'Mecfrank@yahoo.fr',
      })

      .end((err, res) => {
        // eslint-disable-next-line prefer-destructuring
        id = res.body.data.id;
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it('should return a status code of 200', (done) => {
    chai.request(server)
      .get(`/api/v1/Messages/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should get an ID as a whole object', (done) => {
    chai.request(server)
      .get(`/api/v1/Messages/${id}`)
      .end((err, res) => {
        res.should.be.an('object');
        done();
      });
  });

  it('should delete an id in a uuid format', (done) => {
    chai.request(server)
      .get(`/api/v1/Messages/${id}`)

      .end(() => {
        expect(id).to.be.a.uuid('v4');
        done();
      });
  });

  it('should return no message found for unproper ID', (done) => {
    const idy = 1;

    chai.request(server)
      .get(`/api/v1/Messages/${idy}`)

      .end((err, res) => {
        expect(idy).to.not.eql(id);
        if (idy) {
          res.body.should.have.property('message').eql('No Message found with such ID');
        }
        done();
      });
  });

  it('should delete after finding it', (done) => {
    chai.request(server)
      .delete(`/api/v1/Messages/${id}`)
      .end((err, res) => {
        if (id) {
          res.body.should.have.property('message').eql('Message Deleted');
        }
        done();
      });
  });
});
