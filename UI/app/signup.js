/* powering the SIGN UP form with its endpoint */

// Adapted from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
function isValidPassword(value) {
  if (!/[a-z]/.test(value)) {
    return 'Your password must contain at least one lowercase letter';
  } if (!/[A-Z]/.test(value)) {
    return 'Your password must contain at least one uppercase letter';
  } if (!/\d/.test(value)) {
    return 'Your password must contain at least one number';
  } if (!/[@$!%*?&]/.test(value)) {
    return 'Your password must contain at least one of these special characters: @, $, !, %, *, ?, &';
  } if (value.length < 6) {
    return 'Your password must be composed of at least 6 characters';
  }
  return 'true';
}


const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const regEmail = document.getElementById('regEmail');
const pass1 = document.getElementById('pass1');
const pass2 = document.getElementById('pass2');
const pNumber = document.getElementById('pNumber');
const signUpBtn = document.getElementById('sign-up');
const topError2 = document.getElementById('topError');


const localhost2 = 'http://localhost:8080/api/v1';

firstName.onchange = () => {
  const namePattern = /^[a-zA-Z]{4,}[a-zA-Z ]*$/;
  topError2.innerHTML = namePattern.test(firstName.value) ? '' : 'Please Enter a valid FirstName';
  setTimeout(() => {
    topError2.innerHTML = '';
  }, 2500);
};

lastName.onchange = () => {
  const namePattern = /^[a-zA-Z]{4,}[a-zA-Z ]*$/;
  topError2.innerHTML = namePattern.test(lastName.value) ? '' : 'Please Enter a valid LastName';
  setTimeout(() => {
    topError2.innerHTML = '';
  }, 2500);
};

regEmail.onchange = () => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  topError2.innerHTML = emailPattern.test(regEmail.value) ? '' : 'Please Enter a valid Email address';
  setTimeout(() => {
    topError2.innerHTML = '';
  }, 2500);
};

pass1.onchange = () => {
  topError2.innerHTML = isValidPassword(pass1.value) === 'true' ? '' : isValidPassword(pass1.value);
  setTimeout(() => {
    topError2.innerHTML = '';
  }, 2500);
};

pass2.onchange = () => {
  topError2.innerHTML = pass2.value === pass1.value ? '' : 'Your Passwords are not matching';
  setTimeout(() => {
    topError2.innerHTML = '';
  }, 2500);
};

pNumber.onchange = () => {
  const pat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  topError2.innerHTML = pat.test(pNumber.value) ? '' : 'Please Enter a valid Phone number';
  setTimeout(() => {
    topError2.innerHTML = '';
  }, 2500);
};

signUpBtn.onclick = () => {
  if (firstName.value === '' || lastName.value === '' || regEmail.value === ''
      || pass1.value === '' || pass2.value === '' || pNumber.value === '') {
    topError2.innerHTML = 'Check below and fill in all the fields';
    setTimeout(() => {
      topError2.innerHTML = '';
    }, 2500);
  } else {
    const req2 = new Request(`${localhost2}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: firstName.value,
        lastname: lastName.value,
        email: regEmail.value,
        password: pass1.value,
        Phone: pNumber.value,
      }),
    });


    fetch(req2).then(resp => resp.json().then((res) => {
      if (res.status === 400) {
        topError2.innerHTML = res.message;
        setTimeout(() => {
          topError2.innerHTML = '';
        }, 2500);
      }
      if (res.status === 201 && res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('isAdmin', res.data.user.isAdmin);
        if (res.data.user.isAdmin === true) {
          setTimeout(() => {
            window.location.href = 'admin';
          }, 2000);
          return;
        }
        setTimeout(() => {
          window.location.href = 'inbox';
        }, 2000);
      }
    }).catch((err) => {
      topError2.innerHTML = err.message;
    }).catch((fetchErr) => {
      topError2.innerHTML = fetchErr.message;
    }));
  }
};
