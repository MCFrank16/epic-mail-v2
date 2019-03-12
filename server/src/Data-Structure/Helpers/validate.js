class Validate {

    static emailValidation (email){
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      //^[\w.-]+@[\w.-]+[a-zA-Z]{2,4}$
      return emailPattern.test(email) && email;
    }

    static stringValidation (message) {
      let stringPattern = /^.{1,250}$/;
  
      return stringPattern.test(message);
    }

    static subjectValidation (subject) {
      let stringPattern = /^.{1,10}$/;
  
      return stringPattern.test(subject);
    }
}

export default Validate;