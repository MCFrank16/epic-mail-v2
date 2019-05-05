const subjet = document.getElementById('spec');
const divElement = document.getElementById('replyBox');
const replybtn = document.getElementById('btnbtn');
const msgBox = document.getElementById('myInput11');
const replySnack = document.getElementById('replySnack');
const alertError = document.getElementById('alertError');
const openHost = 'http://localhost:8080/api/v1';
const { parentMessageId, senderEmail, topic } = localStorage;
const { token, loggedInUser } = localStorage;

const first = document.addEventListener('DOMContentLoaded', () => {
  const req1 = new Request(`${openHost}/${parentMessageId}/messages`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  });

  fetch(req1).then(resp => resp.json().then((res) => {
    if (res.status === 400) {
      alertError.innerHTML = res.message;
      alertError.style.display = 'block';
      setTimeout(() => {
        alertError.style.display = 'none';
        alertError.innerHTML = '';
      }, 2000);
    } else if (res.status === 200) {
      const { data } = res;
      data.forEach((elem) => {
        const {
          senderlastname, message, subject, senderemail,
        } = elem;
        const arr = [senderemail];
        arr.forEach((email) => {
          if (email !== loggedInUser) {
            localStorage.setItem('senderEmail', email);
            localStorage.setItem('topic', subject);
          }
        });

        subjet.innerHTML = subject;

        const lname = document.createTextNode(`${senderlastname} wrote: `);
        const mesage = document.createTextNode(`${message}`);

        const nameArray = [lname];
        const messageArray = [mesage];
        const p1 = document.createElement('P');
        p1.style.color = 'coral';
        const p2 = document.createElement('p');
        p2.style.color = 'whitesmoke';

        messageArray.forEach((el) => {
          nameArray.forEach((ele) => {
            p1.appendChild(ele);
          });
          divElement.appendChild(p1);
          p2.appendChild(el);
        });
        divElement.appendChild(p2);
      });
    }

    replybtn.onclick = () => {
      const req2 = new Request(`${openHost}/${parentMessageId}/reply/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({
          subject: topic,
          message: msgBox.value,
          receiverEmail: senderEmail,
        }),
      });

      fetch(req2).then(rezp => rezp.json().then((rez) => {
        if (rez.status === 400) {
          alertError.innerHTML = rez.message;
          alertError.style.display = 'block';
          setTimeout(() => {
            alertError.style.display = 'none';
            alertError.innerHTML = '';
          }, 2000);
        } else if (rez.status === 201) {
          replySnack.className = 'show';
          setTimeout(() => {
            replySnack.className = replySnack.className.replace('show', '');
            window.location.reload(first);
          }, 1000);
        }
      }).catch((replyErr) => {
        alertError.innerHTML = replyErr.message;
        alertError.style.display = 'block';
        setTimeout(() => {
          alertError.style.display = 'none';
          alertError.innerHTML = '';
        }, 2000);
      }).catch((fetchReplyErr) => {
        alertError.innerHTML = fetchReplyErr.message;
        alertError.style.display = 'block';
        setTimeout(() => {
          alertError.style.display = 'none';
          alertError.innerHTML = '';
        }, 2000);
      }));
    };
  }).catch((loadErr) => {
    alertError.innerHTML = loadErr.message;
    alertError.style.display = 'block';
    setTimeout(() => {
      alertError.style.display = 'none';
      alertError.innerHTML = '';
    }, 2000);
  }).catch((fetchLoadErr) => {
    alertError.innerHTML = fetchLoadErr.message;
    alertError.style.display = 'block';
    setTimeout(() => {
      alertError.style.display = 'none';
      alertError.innerHTML = '';
    }, 2000);
  }));
});

const logOutBtn = document.getElementById('logoutBTN');
logOutBtn.onclick = () => {
  localStorage.clear();
  setTimeout(() => {
    window.location.href = '/login';
  }, 2000);
};
