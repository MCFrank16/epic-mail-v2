import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/server'
import { Messages } from '../../src/DataBase/Models/EpicMessages';


chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe('GET all Sent Messages', (done) => {
    it('SENT Messages should have a 200 status code', (done) => {
        let data = new Messages({
            subject: 'Hey Boss',
            message: 'Where are you?',
            status:  'Sent',
            receiverEmail: 'Mecfrank16@gmail.com'
        });
       
        chai.request(server)
        .get('/api/v1/Messages/Sent')
        .send(data)
        .end((err,res) => {
            res.should.have.status(200);
            done();
        })
    });

    it('SENT Messages should be an object', (done) => {
        let data = new Messages({
            subject: 'Hey Boss',
            message: 'Where are you?',
            status:  'Sent',
            receiverEmail: 'Mecfrank16@gmail.com'
        });
       
        chai.request(server)
        .get('/api/v1/Messages/Sent')
        .send(data)
        .end((err,res) => {
            res.body.should.be.an('object');    
            done();
        })
    });

    it('SENT Messages should have a property status with SENT as the Value', (done) => {
        let data = new Messages({
            subject: 'Hey Boss',
            message: 'Where are you?',
            status:  'Sent',
            receiverEmail: 'Mecfrank16@gmail.com'
        });
       
        chai.request(server)
        .get('/api/v1/Messages/Sent')
        .send(data)
        .end((err,res) => {
            expect(data.status).to.deep.equal('Sent');
            done();
        })
    });

})