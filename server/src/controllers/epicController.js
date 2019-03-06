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

    // post/ create a message
    postMessage (req,res){
      if(!req.body.message || !req.body.subject || !req.body.receiverEmail) {
          return res.send({
              status: 400,
              message: 'Please fill in all the required fields'
          });

          }

          const newPost = new Messages ({
            id: uuid.v4(),
            createdOn: Date.now().toString(),
            subject: req.body.subject,
            message: req.body.message,
            status: req.body.status,
            parentMessageId: uuid.v4(),
            senderId: uuid.v4(),
            receiverId: uuid.v4(),
            receiverEmail: req.body.receiverEmail

          });

          epicMessages.push(newPost);
          return res.send({
              status: 201,
              data: newPost
          });
      },
    
      getUnreadMessages(req,res) {
         let val = new Messages();
         let messages={
             status: 200,
             data: []
         };
         const unRead = epicMessages.filter( val => val.status === 'Unread');
         if(!unRead.length){
            messages={
                status: 200,
                message: 'No unread message found'
            };
         }else{
            messages.data = unRead;
         }
         return res.send(messages)
      }

    } 




export default messageData;