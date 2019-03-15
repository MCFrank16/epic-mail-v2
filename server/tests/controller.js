import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';
import { Messages, db } from '../Models/EpicMessages';
import validate from '../Helpers/validate';

let expect = chai.expect;
let should = chai.should;

describe('check the controller', (done) => {
    it('should clear the test for the controller', (done) => {
      chai.request(server)
    });
})