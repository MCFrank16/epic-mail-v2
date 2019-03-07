import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';
import message, { Messages } from '../src/models/epicMessages';
import uuid from 'uuid';

let should = chai.should;
let expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-uuid'));




describe('GET a message by its specific ID', (done) => {
    let id;
    beforeEach((done) => {
        chai.request(server)
        .post('/api/v1/Messages')
        .send({
         subject: 'Hey There',
         message: 'Hey I miss you',
         status: 'Read',
         receiverEmail: 'Mecfrank@yahoo.fr'
})
        .end((err,res) => {
            id = res.body.data.id;
            done();
        })
    })
  
    it('should return a status code of 200', (done) => {
      chai.request(server)
      .get(`/api/v1/Messages/${id}`)
      .end((err,res) => {
          res.should.have.status(200);
          done();
      })
    });

    it('should return the object', (done) => {
      chai.request(server)
      .get('/api/v1/Messages/:id')
      .end((err,res) => {
          res.body.should.be.an('object');
          done();
      });
    });

    it('should also check the ID to exist and also if it has a uuid format', (done) => {
       
       chai.request(server)
       .get(`/api/v1/Messages/${id}`)
       
       .end((err,res) => {
           expect(id).to.be.a.uuid('v4');
           done();
       })

    });

    it('should send no Message found', (done) => {
        let id = 1
        chai.request(server)
        .get(`/api/v1/Messages/${id}`)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('No Message found with such ID');
            done();
        })
    })
});