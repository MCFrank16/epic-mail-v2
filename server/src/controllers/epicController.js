import uuid from 'uuid';
import { epicMessages,Messages} from '../models/epicMessages';

const messageData = {
    
    // get all the messages
    getAllMessages(req,res) {
        const allMessages = epicMessages;
        res.send({
            status: 200,
            data: allMessages
        });
      
    },
}

export default messageData;