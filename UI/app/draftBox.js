const draftHost = 'http://localhost:8080/api/v1';
const modal = document.getElementById('myModal');
const para = document.getElementById('text');
const resendbtn = document.getElementById('btn1');
const deleteBtn = document.getElementById('btn2');
const searchInput = document.getElementById('myInput1');
const filter = searchInput.value.toUpperCase();
const table = document.getElementById('myTable1');
const alertError = document.getElementById('alertError');
const span = document.getElementsByClassName('close')[0];

span.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = () => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

const draftmessages = document.addEventListener('DOMContentLoaded', () => {
  const draftReq = new Request(`${draftHost}/draft/messages`, {
    method: 'GET',
    headers: {
      'x-access-token': localStorage.token,
    },
  });

  fetch(draftReq).then(resp => resp.json().then((res) => {
    if (res.status === 404) {
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
          receiveremail, subject, senderstatus, receiverstatus, createdondate, createdontime, id,
        } = elem;

        const To = document.createTextNode(`${receiveremail}`);
        const Subject = document.createTextNode(`${subject}`);
        const Status = document.createTextNode(`${senderstatus}`);
        const Taime = document.createTextNode(`${createdondate} ${createdontime}`);

        const draftArray = [To, Subject, Status, Taime];
        const tr = document.createElement('TR');

        const tbody = document.getElementById('draftBody');
        draftArray.forEach((cell) => {
          const td = document.createElement('TD');
          td.appendChild(cell);
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
        tr.onclick = () => {
          localStorage.setItem('messageId', id);
          localStorage.setItem('senderStatus', senderstatus);
          localStorage.setItem('receiverStatus', receiverstatus);

          const msgId = localStorage.messageId;
          const modalReq = new Request(`${draftHost}/messages/${msgId}`, {
            method: 'GET',
            headers: {
              'x-access-token': localStorage.token,
            },
          });

          fetch(modalReq).then(respo => respo.json().then((reso) => {
            if (reso.status === 404) {
              para.innerHTML = reso.message;
            } else if (reso.status === 200) {
              const { message } = reso.data;
              localStorage.setItem('TRmessage', message);
              para.innerHTML = message;
            }
          }).catch((erro) => {
            para.innerHTML = erro.message;
          }).catch((fetchErro) => {
            para.innerHTML = fetchErro.message;
          }));
          modal.style.display = 'block';
          // para.innerHTML = msgId;
        };
        // searchInput.onclick = () => {
        //   const table = document.getElementById('myTable1');
        //   const row = table.getElementsByTagName('TR');
        //   const data = td;
        //   for (let i = 0; i < tr.leng)
        //   alert(row);
        // };
      });
    }
  }).catch((err) => {
    alertError.innerHTML = err.message;
    alertError.style.display = 'block';
    setTimeout(() => {
      alertError.style.display = 'none';
      alertError.innerHTML = '';
    }, 2000);
  }).catch((fetchErr) => {
    alertError.innerHTML = fetchErr.message;
    alertError.style.display = 'block';
    setTimeout(() => {
      alertError.style.display = 'none';
      alertError.innerHTML = '';
    }, 2000);
  }));
});

deleteBtn.onclick = () => {
  const smsId = localStorage.messageId;
  const delReq = new Request(`${draftHost}/messages/${smsId}`, {
    method: 'DELETE',
    headers: {
      'x-access-token': localStorage.token,
    },
  });
  fetch(delReq).then(rep => rep.json().then((yes) => {
    if (yes.status === 404) {
      para.innerHTML = yes.message;
    } else if (yes.status === 200) {
      setTimeout(() => {
        para.innerHTML = yes.message;
        modal.style.display = 'none';
      }, 1500);
      window.location.reload(draftmessages);
    }
  }).catch((erreur) => {
    para.innerHTML = erreur.message;
  }).catch((fetchErreur) => {
    para.innerHTML = fetchErreur.message;
  }));
};

resendbtn.onclick = () => {
  const ResendReq = new Request(`${draftHost}/resend/${localStorage.messageId}/message`, {
    method: 'PUT',
    headers: {
      'x-access-token': localStorage.token,
    },
  });
  fetch(ResendReq).then(rep => rep.json().then((yes) => {
    if (yes.status === 400) {
      para.innerHTML = yes.message;
    } else if (yes.status === 200) {
      setTimeout(() => {
        para.innerHTML = yes.message;
      }, 1500);
      modal.style.display = 'none';
      window.location.reload(draftmessages);
    }
  }).catch((erreur) => {
    para.innerHTML = erreur.message;
  }).catch((fetchErreur) => {
    para.innerHTML = fetchErreur.message;
  }));
};

const logOutBtn = document.getElementById('logoutBTN');
logOutBtn.onclick = () => {
  localStorage.clear();
  setTimeout(() => {
    window.location.href = '/login';
  }, 2000);
};


// searchInput.onkeyup = () => {
//   const row = table.getElementsByTagName('tr');
//   for (let i = 0; i < row.length; i += 1) {
//     const data = row[i].getElementsByTagName('td')[0];
//     if (data) {
//       const txtValue = data.textContent || data.innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         row[i].style.display = '';
//       } else {
//         row[i].style.display = 'none';
//       }
//     }
//   }
// };
