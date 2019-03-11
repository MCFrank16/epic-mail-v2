import express from 'express';
import epicControllers from '../controllers/epicController';


const router = express.Router();

//Home Endpoint route
router.get('/api/v1', (req, res) => {
    res.send({ message: 'Welcome to Epic Mail Service API EndPoint' });
});
//get all Epic Messages Endpoint
router.get('/api/v1/Messages', epicControllers.getAllMessages);

// POST/create/send a message
router.post('/api/v1/Messages',epicControllers.postMessage);

// Get all unread Messages
router.get('/api/v1/Messages/Unread', epicControllers.getUnreadMessages);

// Get all sent Messages
router.get('/api/v1/Messages/Sent', epicControllers.getSentMessages);

// Get Message by Id
router.get('/api/v1/Messages/:id', epicControllers.getByMessageId);

// Delete Message by Id
router.delete('/api/v1/Messages/:id', epicControllers.deleteMessageById);

export default router;