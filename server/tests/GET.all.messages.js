import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';

const should = chai.should();
const expect = chai.expect();

chai.use(chaiHttp);

describe('Get All Messages',() => {
  it('should Get the Messages', (done) =>{
    chai.request(server)
    .get('/api/v1/Messages')
    .end((err,res) => {
      res.should.have.status(200);
      done();

    })
  })

  it('should check for the response to be an object', (done) => {
    chai.request(server)
    .get('/api/v1/Messages')
    .end((err,res) => {
      res.body.should.be.an('object');
      done();
    })
  })
});



