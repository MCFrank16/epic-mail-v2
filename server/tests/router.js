import chai from 'chai';
import server from '../src/server';

let should = chai.should();
let expect = chai.expect;

describe('it should test the router', (done) => {
    it('should send welcome to epic mail endpoint', (done) => {
        chai.request(server)
        .get('/api/v1')
        .end((err,res) =>  {
           expect(res.body).to.have.property('message').to.equal('Welcome to Epic Mail Service API EndPoint');
           done();
        })

    });

    it('should return URL not Found', (done) => {
        chai.request(server)
        .get('/')
        .end((err,res) => {
            expect(res.body).to.have.property('Status').to.eql(404);
            expect(res.body).to.have.property('Message').to.eql('URL not Found');
            done();
        })
    })
})