class Validate {

    static emailValidation (email){
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      //^[\w.-]+@[\w.-]+[a-zA-Z]{2,4}$
      return emailPattern.test(email) && email;
    }

    static messageValidation (message) {
      let stringPattern = /^.{1,250}$/;
  
      return stringPattern.test(message.trim());
    }

    static subjectValidation (subject) {
      let stringPattern = /^.{1,15}$/;
  
      return stringPattern.test(subject.trim());
    }
}

export default Validate;