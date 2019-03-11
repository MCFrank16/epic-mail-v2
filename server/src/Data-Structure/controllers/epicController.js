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
         let unreadVal = new Messages();
         let unreadMessages={
             status: 200,
             data: []
         };
         const unRead = epicMessages.filter( unreadVal => unreadVal.status === 'Unread');
         if(!unRead.length){
            unreadMessages={
                status: 200,
                message: 'No unread message found'
            };
         }else{
            unreadMessages.data = unRead;
         }
         return res.send(unreadMessages)
      },

      getSentMessages(req,res) {
        let sentVal = new Messages();
        let sentMessages={
            status: 200,
            data: []
        };
        const unRead = epicMessages.filter( sentVal => sentVal.status === 'Sent');
        if(!unRead.length){
           sentMessages={
               status: 200,
               message: 'No sent message found'
           };
        }else{
           sentMessages.data = unRead;
        }
        return res.send(sentMessages)
     },

     getByMessageId(req,res){
         let byId = new Messages();
         const { id } = req.params;
         let byIdMessages = {
             status: 200,
             data: {}
         }
         const result = epicMessages.find( byId => byId.id === id);
         if(!result){
            byIdMessages = {
                status: 200,
                message: 'No Message found with such ID'
            }
         } else {
             byIdMessages = {
                 status: 200,
                 data: result
             }
         }
         return res.send(byIdMessages);

     },

     
     deleteMessageById(req,res){
        let deleteval = new Messages();
        const { id } = req.params;
        let deleteMessages = {
            status: 200,
            data: {}
        }
        const result = epicMessages.find( deleteval => deleteval.id === id);
        const delety = epicMessages.indexOf(result);
        epicMessages.splice(delety,1);
        if(!result){
           deleteMessages = {
               status: 200,
               message: 'No Message found with such ID'
           }
        } else {
            deleteMessages = {
                status: 200,
                message: 'Message Deleted'
            }
        }
        return res.send(deleteMessages);

    }
    } 




export default messageData;