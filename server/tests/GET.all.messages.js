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
      res.body.should.be.a('object');
      done();

    });
  });
});



