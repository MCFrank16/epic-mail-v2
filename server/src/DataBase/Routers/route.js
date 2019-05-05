import express from 'express';
import dotenv from 'dotenv';
import epicControllers from '../Controllers/EpicController';
import UserController from '../Controllers/UserController';
import GroupController from '../Controllers/GroupController';
import GroupMember from '../Controllers/GroupMemberController';
import CheckToken from '../Middleware/Validate';
import { checkServerIdentity } from 'tls';
// import GroupMemberQuery from '../DB/Queries/GroupMemberQuery';

dotenv.config();


const router = express.Router();

// Home Endpoint route
router.get('/api/v1', (req, res) => {
  res.send({ message: 'Welcome to Epic Mail Service API EndPoint' });
});
// get all Inbox Messages Endpoint
router.get('/api/v1/messages/inbox', CheckToken.validateToken, epicControllers.getInboxMessages);

// mark a message as read
router.put('/api/v1/update/:id/read', CheckToken.validateToken, epicControllers.markMessageAsRead);

// POST/create/send a message
router.post('/api/v1/message/send', CheckToken.validateToken, epicControllers.postMessage);

// POST/create/draft a message
router.post('/api/v1/message/draft', CheckToken.validateToken, epicControllers.makeDraftMessage);

// // Get all draft Messages
router.get('/api/v1/draft/messages', CheckToken.validateToken, epicControllers.getdraftMessages);

// Resend a drafted Message
router.put('/api/v1/resend/:id/message', CheckToken.validateToken, epicControllers.resendMessage);

// // Get all sent Messages
router.get('/api/v1/messages/sent', CheckToken.validateToken, epicControllers.getSentMessages);

// // Get Message by Id
router.get('/api/v1/messages/:id', CheckToken.validateToken, epicControllers.getMessageById);

// Get Message by ParentMessageId
router.get('/api/v1/:parentMessageId/messages', CheckToken.validateToken, epicControllers.getMessageByParentMessageId);

// Reply Message
router.post('/api/v1/:parentMessageId/reply/messages', CheckToken.validateToken, epicControllers.replyMessage);

// // Delete Message by Id
router.delete('/api/v1/messages/:id', CheckToken.validateToken, epicControllers.deleteById);

// create a user account
router.post('/api/v1/auth/signup', UserController.registerUser);

// login a user
router.post('/api/v1/auth/login', UserController.loginUser);

// select all emails in the system
router.get('/api/v1/select/emails', CheckToken.validateToken, UserController.selectEmails);

// create a group
router.post('/api/v1/groups', CheckToken.validateToken, GroupController.createGroup);

// get All group
router.get('/api/v1/get/groups', CheckToken.validateToken, GroupController.getAllGroup);

// read the number of all members
router.get('/api/v1/get/:id/membersnumber', CheckToken.validateToken, GroupController.readGroupMember);

// update a group
router.patch('/api/v1/groups/:id/name', CheckToken.validateToken, GroupController.updateGroupName);

// delete a group
router.delete('/api/v1/groups/:id', CheckToken.validateToken, GroupController.deleteGroup);

// add a user to a group
router.post('/api/v1/groups/:groupId/users', CheckToken.validateToken, GroupMember.addUsertoGroup);

// delete a user from a group
router.delete('/api/v1/groups/delete/:groupId/users', CheckToken.validateToken, GroupMember.deleteUsertoGroup);

// add a message to a group
router.post('/api/v1/groups/:groupId/messages', CheckToken.validateToken, GroupMember.addMessageToGroup);

// draft a group message
router.post('/api/v1/groups/:groupId/draft/message', CheckToken.validateToken, GroupMember.draftMessageToGroup);

export default router;
