/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/server';
import { Messages } from '../../src/DataBase/Models/EpicMessages';


chai.should();
const { expect } = chai;

chai.use(chaiHttp);

describe('GET all unread Messages', () => {
  it('UNREAD Messages should have a 200 status code', (done) => {
    const data = new Messages({
      subject: 'Hey Boss',
      message: 'Where are you?',
      status: 'Unread',
      receiverEmail: 'Mecfrank16@gmail.com',
    });

    chai.request(server)
      .get('/api/v1/Messages/Unread')
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('UNREAD Messages should be an object', (done) => {
    const data = new Messages({
      subject: 'Hey Boss',
      message: 'Where are you?',
      status: 'Unread',
      receiverEmail: 'Mecfrank16@gmail.com',
    });

    chai.request(server)
      .get('/api/v1/Messages/Unread')
      .send(data)
      .end((err, res) => {
        res.body.should.be.an('object');
        done();
      });
  });

  it('UNREAD Messages should have a property status with Unread as the Value', (done) => {
    const data = new Messages({
      subject: 'Hey Boss',
      message: 'Where are you?',
      status: 'Unread',
      receiverEmail: 'Mecfrank16@gmail.com',
    });

    chai.request(server)
      .get('/api/v1/Messages/Unread')
      .send(data)
      .end(() => {
        expect(data.status).to.deep.equal('Unread');
        done();
      });
  });
});
