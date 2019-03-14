import express from 'express';
import epicControllers from '../Controllers/EpicController';


const router = express.Router();

//Home Endpoint route
router.get('/api/v1', (req, res) => {
    res.send({ message: 'Welcome to Epic Mail Service API EndPoint' });
});
//get all Epic Messages Endpoint
router.get('/api/v1/messages', epicControllers.getAllMessages);

// POST/create/send a message
router.post('/api/v1/messages',epicControllers.postMessage);

// Get all unread Messages
router.get('/api/v1/messages/unread', epicControllers.getUnreadMessages);

// Get all sent Messages
router.get('/api/v1/messages/sent', epicControllers.getSentMessages);

// Get Message by Id
router.get('/api/v1/messages/:id', epicControllers.getByMessageId);

// Delete Message by Id
router.delete('/api/v1/messages/:id', epicControllers.deleteMessageById);

export default router;