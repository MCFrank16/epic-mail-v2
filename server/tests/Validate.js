/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import checkToken from '../src/DataBase/Middleware/Validate';


const { expect, should } = chai;

chai.use(chaiHttp);

describe('should test the middleware of token generating', () => {
  it('should ask a user to login if the token is not provided', (done) => {
    const req = {
      headers: {},
    };
    const res = {
      send: () => ({
        status: 400,
        message: 'please login in first',
      }),

    };
    checkToken.validateToken(req, res, () => {
      const token = req.headers['x-access-token'];
      if (!token) {
        expect(res.send).to.have.property('status').eql(res.send.status);
        expect(res.send).to.have.property('message').eql(res.send.message);
        done();
      }
    });
    done();
  });

  it('should verify the token if it has been provided', (done) => {
    const req = {
      headers: {
        token: 'invalidToken',
      },
    };
    const res = {
      send: () => ({
        status: 400,
        message: 'Failed to authenticate',
      }),

    };
    checkToken.validateToken(req, res, () => {
      // const token = req.headers['x-access-token'];
      expect(res.send).to.have.property('status').eql(res.send.status);
      expect(res.send).to.have.property('message').eql(res.send.message);
      done();
    });
    done();
  });
});
