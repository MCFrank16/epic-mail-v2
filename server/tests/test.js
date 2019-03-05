import chai from 'chai';
const should = chai.should();
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('GET /api/v1/users', () => {
    it('should respond with all users', (done) => {
    chai.request(server)
    .get('/api/v1/users')
    .send({
    user_id: '1',
    autherization_token: 'f6411750-7529-11e8-ad64-3b3e9fa9ecfc',
    })
    .end((err, res) => {
    // there should be no errors
    should.not.exist(err);
    // there should be a 200 status code
    res.status.should.equal(200);
    // the response should be JSON
    res.type.should.equal('application/json');
    // the JSON response body should have a
    // key-value pair of {"status": "success"}
    res.body.status.should.eql('success');
    // the JSON response body should have a
    // key-value pair of {"data": [2 user objects]}
    res.body.data.length.should.eql(2);
    // the first object in the data array should
    // have the right keys
    res.body.data[0].should.include.keys(
    'id', 'username', 'email', 'created_at'
    );
    done();
        });
      });
    });