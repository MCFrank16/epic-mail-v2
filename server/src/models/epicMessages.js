const epicMessages = [];
class Messages {
    constructor({id
        ,createdOn
        ,subject
        ,message
        ,status
        ,parentMessageId
        ,senderId
        ,receiverId
        ,receiverEmail
    } = {}){
        this.id = id;
        this.createdOn = createdOn;
        this.subject = subject;
        this.message = message;
        this.status = status;
        this.parentMessageId = parentMessageId;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.receiverEmail = receiverEmail;
    }

    getUnread(status){
      const stat = status || this.status;
      const unReadMessages = epicMessages.filter( val => val.status === stat);
    }
    
}
 export { epicMessages, Messages };