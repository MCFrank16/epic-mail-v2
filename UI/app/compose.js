// consuming the endpoint for sending a message or drafting it up....

const receiverEmail = document.getElementById('emailId');
const subject = document.getElementById('subj');
const message = document.getElementById('subject');
const sendBtn = document.getElementById('btnbtn1');
const draftBtn = document.getElementById('draftBtn');
const draftSnack = document.getElementById('snackbar2');
const sendSnack = document.getElementById('snackbar');
const alertError = document.getElementById('alertError');
const logOutBtn = document.getElementById('logoutBTN');

const sendHost = 'http://localhost:8080/api/v1';

sendBtn.addEventListener('click', () => {
  const req = new Request(`${sendHost}/message/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
    },
    body: JSON.stringify({
      subject: subject.value,
      message: message.value,
      receiverEmail: receiverEmail.value,
    }),
  });
  fetch(req).then(resp => resp.json().then((res) => {
    if (res.status === 400) {
      alertError.innerHTML = res.message;
      alertError.style.display = 'block';
      setTimeout(() => {
        alertError.style.display = 'none';
        alertError.innerHTML = '';
      }, 2000);
    } else if (res.status === 201) {
      sendSnack.className = 'show';
      setTimeout(() => {
        sendSnack.className = sendSnack.className.replace('show', '');
        window.location.reload();
        receiverEmail.innerHTML = '';
        subject.innerHTML = '';
        message.innerHTML = '';
      }, 2500);
    }
  }).catch((sendErr) => {
    alertError.innerHTML = sendErr.message;
    alertError.style.display = 'block';
    setTimeout(() => {
      alertError.style.display = 'none';
      alertError.innerHTML = '';
    }, 2000);
  }).catch((fetchSendErr) => {
    alertError.innerHTML = fetchSendErr.message;
    alertError.style.display = 'block';
    setTimeout(() => {
      alertError.style.display = 'none';
      alertError.innerHTML = '';
    }, 2000);
  }));
});

draftBtn.onclick = () => {
  const draftreq = new Request(`${sendHost}/message/draft`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
    },
    body: JSON.stringify({
      subject: subject.value,
      message: message.value,
      receiverEmail: receiverEmail.value,
    }),
  });

  fetch(draftreq).then(draftresp => draftresp.json().then((draftres) => {
    if (draftres.status === 400) {
      alertError.innerHTML = draftres.message;
      alertError.style.display = 'block';
      setTimeout(() => {
        alertError.style.display = 'none';
        alertError.innerHTML = '';
      }, 2000);
    } else if (draftres.status === 201) {
      draftSnack.className = 'show';
      setTimeout(() => {
        draftSnack.className = draftSnack.className.replace('show', '');
        receiverEmail.innerHTML = '';
        subject.innerHTML = '';
        message.innerHTML = '';
        window.location.reload();       
      }, 2500);
    }
  }).catch((draftErr) => {
    alertError.innerHTML = draftErr.message;
    alertError.style.display = 'block';
    setTimeout(() => {
      alertError.style.display = 'none';
      alertError.innerHTML = '';
    }, 2000);
  }).catch((fetchDraftErr) => {
    alertError.innerHTML = fetchDraftErr.message;
    alertError.style.display = 'block';
    setTimeout(() => {
      alertError.style.display = 'none';
      alertError.innerHTML = '';
    }, 2000);
  }));
};

// implement the logout logic

logOutBtn.onclick = () => {
  localStorage.clear();
  setTimeout(() => {
    window.location.href = '/login';
  }, 2000);
};
