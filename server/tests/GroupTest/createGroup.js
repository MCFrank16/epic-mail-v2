/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'chai-uuid';
import app from '../../src/server';


const { expect } = chai;

chai.use(chaiHttp);

let token;

before((done) => {
  const admin = {
    email: 'robalain@gmail.com',
    password: 'ROB123',
  };

  chai.request(app).post('/api/v1/auth/login')
    .send(admin)
    .end((err, res) => {
        console.log(res.body);
      token = res.body.data[0].token;
      done();
    });
});

describe('create a group', () => {
  it('should create a group and send a 201 status', (done) => {
    chai.request(app)
      .post('/api/v1/groups')
      .send({
        name: 'Boyssssssssssss',
        role: 'Group Admin',
      })
      .set('x-access-token', token)
      .end((err, res) => {
        res.body.should.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('name').to.eql('Boyssssssssssss');
        expect(res.body.data).to.have.property('role').to.eql('Group Admin');
        expect(res.body.data).to.have.property('ownerid');
        expect(res.body.data).to.have.property('createdon');
        done();
      });
  });
});
