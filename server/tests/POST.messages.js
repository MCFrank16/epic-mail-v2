import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';

const should = chai.should();
const expect = chai.expect();

chai.use(chaiHttp);

describe('Post Messages', (done) =>{
it('should check for all fields requirements', (done) => {
  let body = {
    subject: "",
    message: "",
    receiverEmail: ""
  }
  
 chai.request(server)
 .post('/api/v1/Messages')
 .send(body)
 .end((err,res) => {
   
   res.body.should.have.status(400);
   res.body.should.have.property('message').eql('Please fill in all the required fields');
   done();
 });

});

it('should post a new Email', (done) => {
  let body = {
    subject: 'Bite c?',
    message: 'ko twaburanye waburiye he?',
    status: 'sent',
    receiverEmail: 'Mecfrank@yahoo.fr'
  };
  chai.request(server)
  .post('/api/v1/Messages')
  .send(body)
  .end((err,res) => {
     res.body.should.have.status(201);
     res.body.should.be.a('object');
     done();

  });

})

});