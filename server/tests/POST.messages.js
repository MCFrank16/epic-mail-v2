import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';
import { Messages } from '../src/models/epicMessages';
import uuid from 'uuid';

let should =  chai.should;
let expect = chai.expect;

chai.use(chaiHttp);

describe('Post Messages', (done) =>{
it('should save an email and send a 201 status', (done) => {
  let dummy = new Messages({
    id:uuid.v4(),
    createdOn:Date.now().toString(),
    subject: 'Hey Sir!!',
    message: 'Sir Bimeze bite?',
    status:  'read',
    parentMessageId: uuid.v4(),
    senderId: uuid.v4(),
    receiverId: uuid.v4(),
    receiverEmail: 'Mecfrank16@gmail.com'
  });

  
 chai.request(server)
 .post('/api/v1/Messages')
 .send(dummy)
 .end((err,res) => {
   
   res.body.should.have.status(201);
   done();
 });

});

it('should save an email as an new object', (done) => {
  let dummy = new Messages({
    id:uuid.v4(),
    createdOn:Date.now().toString(),
    subject: 'Hey Sir!!',
    message: 'Sir Bimeze bite?',
    status:  'read',
    parentMessageId: uuid.v4(),
    senderId: uuid.v4(),
    receiverId: uuid.v4(),
    receiverEmail: 'Mecfrank16@gmail.com'
  });

  
 chai.request(server)
 .post('/api/v1/Messages')
 .send(dummy)
 .end((err,res) => {
   
   res.body.should.have.an('object');
   done();
 });

});


it('should have 9 property', (done) => {
  let dummy = new Messages({
    id:uuid.v4(),
    createdOn:Date.now().toString(),
    subject: 'Hey Sir!!',
    message: 'Sir Bimeze bite?',
    status:  'read',
    parentMessageId: uuid.v4(),
    senderId: uuid.v4(),
    receiverId: uuid.v4(),
    receiverEmail: 'Mecfrank16@gmail.com'
  });

  
 chai.request(server)
 .post('/api/v1/Messages')
 .send(dummy)
 .end((err,res) => {

  expect(dummy).to.have.property('id');
  expect(dummy).to.have.property('createdOn');
  expect(dummy).to.have.property('subject');
  expect(dummy).to.have.property('message');
  expect(dummy).to.have.property('status');
  expect(dummy).to.have.property('parentMessageId');
  expect(dummy).to.have.property('senderId');
  expect(dummy).to.have.property('receiverId');
  expect(dummy).to.have.property('receiverEmail');
   
   done();
 });

});

it('should check for the 3 required fields', (done) => {
  let dummy = new Messages({
    id:uuid.v4(),
    createdOn:Date.now().toString(),
    subject: '',
    message: '',
    status:  'read',
    parentMessageId: uuid.v4(),
    senderId: uuid.v4(),
    receiverId: uuid.v4(),
    receiverEmail: ''
  });

  
 chai.request(server)
 .post('/api/v1/Messages')
 .send(dummy)
 .end((err,res) => {


  
  expect(dummy).to.have.property('subject').to.equal('');
  expect(dummy).to.have.property('message').to.equal('');
  expect(dummy).to.have.property('receiverEmail').to.equal('');
   
   done();
 });

});

});