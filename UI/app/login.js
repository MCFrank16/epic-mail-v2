/* powering the SIGN IN form with its endpoint */

const signInBtn = document.getElementById('sign-in');
const emeli = document.querySelector('#userEmail');
const passKey = document.querySelector('#passWadi');
const topError = document.getElementById('topError');

const localhost = 'http://localhost:8080/api/v1';

signInBtn.onclick = () => {
  const Email = emeli.value;
  const Password = passKey.value;

  if (!Email || !Password) {
    topError.innerHTML = 'Please fill in all the requirements';
    setTimeout(() => {
      topError.innerHTML = '';
    }, 2500);
  } else {
    const req = new Request(`${localhost}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: Email, password: Password }),
    });
    fetch(req).then(resp => resp.json().then((res) => {
      if (res.status === 400) {
        topError.innerHTML = res.message;
      }
      setTimeout(() => {
        topError.innerHTML = '';
      }, 2500);
      if (res.status === 200 && res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('isAdmin', res.result.userRole);
        localStorage.setItem('loggedInUser', res.result.userEmail);
        localStorage.setItem('userFirstname', res.result.userFirstname);
        localStorage.setItem('userLastname', res.result.userLastname);
        localStorage.setItem('userId', res.result.userId);

        if (res.result.userRole === 'true') {
          setTimeout(() => {
            window.location.href = '/admin/compose/email';
          }, 2000);
          return;
        }
        setTimeout(() => {
          window.location.href = 'compose/email';
        }, 2000);
      }
    }).catch((err) => {
      topError.innerHTML = err.message;
    }).catch((fetchErr) => {
      topError.innerHTML = fetchErr.message;
    }));
  }
};
