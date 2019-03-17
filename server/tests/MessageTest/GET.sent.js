/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/server';
import { Messages } from '../../src/DataBase/Models/EpicMessages';


chai.should();
const { expect } = chai;

chai.use(chaiHttp);

describe('GET all Sent Messages', () => {
  it('SENT Messages should have a 200 status code', (done) => {
    const data = new Messages({
      subject: 'Hey Boss',
      message: 'Where are you?',
      status: 'Sent',
      receiverEmail: 'Mecfrank16@gmail.com',
    });

    chai.request(server)
      .get('/api/v1/Messages/Sent')
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('SENT Messages should be an object', (done) => {
    const data = new Messages({
      subject: 'Hey Boss',
      message: 'Where are you?',
      status: 'Sent',
      receiverEmail: 'Mecfrank16@gmail.com',
    });

    chai.request(server)
      .get('/api/v1/Messages/Sent')
      .send(data)
      .end((err, res) => {
        res.body.should.be.an('object');
        done();
      });
  });

  it('SENT Messages should have a property status with SENT as the Value', (done) => {
    const data = new Messages({
      subject: 'Hey Boss',
      message: 'Where are you?',
      status: 'Sent',
      receiverEmail: 'Mecfrank16@gmail.com',
    });

    chai.request(server)
      .get('/api/v1/Messages/Sent')
      .send(data)
      .end(() => {
        expect(data.status).to.deep.equal('Sent');
        done();
      });
  });
});
