class dataBase {
    constructor(){
        this.epicMessages = [];
        //this.users = [];
    }

    addMessage(message){
        this.epicMessages.push(message)
    }

    getUnread(message){
        return this.epicMessages.filter( unreadVal => unreadVal.status === 'unread');
    }

    getSent(sent){
        return this.epicMessages.filter( sent => sent.status === "sent");
    }

    getById(id){
         return this.epicMessages.find( message => message.id === id);
    }

    deleteById(id){
      const result = this.getById(id);
      if (result){
        const delety = this.epicMessages.indexOf(result);
        this.epicMessages.splice(delety,1);
      }
      return result;
      
    }
};

export default dataBase;