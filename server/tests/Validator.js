import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';

let expect = chai.expect;
let should = chai.should;

describe('It should return please enter a subject', (done) => {
    it('should ask a user to enter a subject', (done) => {
        chai.request(server)
        .post('/api/v1/messages')
        .send({
            "subject": "",
            "message": "Hey",
            "receiverEmail": "mecfrank@gmail.com"
        })
        .end((err,res)=>{
           expect(res.body).to.have.property('status').to.eql(400);
           expect(res.body).to.have.property('message').to.eql('Please enter the subject');
           done();
        })
    });

    it('should ask a user to enter a message', (done) => {
        chai.request(server)
        .post('/api/v1/messages')
        .send({
            "subject": "Hey",
            "message": "",
            "receiverEmail": "mecfrank@gmail.com"
        })
        .end((err,res)=>{
           expect(res.body).to.have.property('status').to.eql(400);
           expect(res.body).to.have.property('message').to.eql('Please enter your message');
           done();
        })
    });
})