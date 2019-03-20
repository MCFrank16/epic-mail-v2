import express from 'express';
import dotenv from 'dotenv';
import epicControllers from '../Controllers/EpicController';
import UserController from '../Controllers/UserController';
import GroupController from '../Controllers/GroupController';
import CheckToken from '../Middleware/Validate';

dotenv.config();


const router = express.Router();

// Home Endpoint route
router.get('/api/v1', (req, res) => {
  res.send({ message: 'Welcome to Epic Mail Service API EndPoint' });
});
// get all Epic Messages Endpoint
router.get('/api/v1/messages', CheckToken.validateToken, epicControllers.getAllMessages);

// POST/create/send a message
router.post('/api/v1/messages', CheckToken.validateToken, epicControllers.postMessage);

// // Get all unread Messages
router.get('/api/v1/messages/unread', CheckToken.validateToken, epicControllers.getUnreadMessages);

// // Get all sent Messages
router.get('/api/v1/messages/sent', CheckToken.validateToken, epicControllers.getSentMessages);

// // Get Message by Id
router.get('/api/v1/messages/:id', CheckToken.validateToken, epicControllers.getMessageById);

// // Delete Message by Id
router.delete('/api/v1/messages/:id', CheckToken.validateToken, epicControllers.deleteById);

// create a user account
router.post('/api/v1/auth/signup', UserController.registerUser);

// login a user
router.post('/api/v1/auth/login', UserController.loginUser);

// create a group
router.post('/api/v1/groups', CheckToken.validateToken, GroupController.postGroup);

// get All group
router.get('/api/v1/groups', CheckToken.validateToken, GroupController.getAllGroupMessages);

// update a group
router.patch('/api/v1/groups/:id/name', CheckToken.validateToken, GroupController.updateGroupName);

// delete a group
router.delete('/api/v1/groups/:id', CheckToken.validateToken, GroupController.deleteGroup);

export default router;
