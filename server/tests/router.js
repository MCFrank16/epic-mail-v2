/* eslint-disable no-undef */
import chai from 'chai';
import server from '../src/server';

const should = chai.should();
const { expect } = chai;

// eslint-disable-next-line no-undef
describe('it should test the router', () => {
  // eslint-disable-next-line no-undef
  it('should send welcome to epic mail endpoint', (done) => {
    chai.request(server)
      .get('/api/v1')
      .end((err, res) => {
        expect(res.body).to.have.property('message').to.equal('Welcome to Epic Mail Service API EndPoint');
        done();
      });
  });

  it('should return URL not Found', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res.body).to.have.property('Status').to.eql(404);
        expect(res.body).to.have.property('Message').to.eql('URL not Found');
        done();
      });
  });

  it('should set the port variable', (done) => {
    const PORT = process.env.PORT || 8080;
    expect(PORT).to.eql(PORT);
    done();
  });
});
