const sentHost = 'http://localhost:8080/api/v1';
const modal = document.getElementById('myModal');
const para = document.getElementById('text');
const cancelbtn = document.getElementById('btn2');
const deleteBtn = document.getElementById('btn1');
const searchInput = document.getElementById('myInput1');
const filter = searchInput.value.toUpperCase();
const table = document.getElementById('myTable1');
const span = document.getElementsByClassName('close')[0];

span.onclick = () => {
  modal.style.display = 'none';
};

cancelbtn.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = () => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

const sentmessages = document.addEventListener('DOMContentLoaded', () => {
  const sentReq = new Request(`${sentHost}/messages/sent`, {
    method: 'GET',
    headers: {
      'x-access-token': localStorage.token,
    },
  });

  fetch(sentReq).then(resp => resp.json().then((res) => {
    if (res.status === 404) {
      alert(res.message);
    } else if (res.status === 200) {
      const { data } = res;
      data.forEach((elem) => {
        const {
          receiveremail, subject, senderstatus, createdondate, createdontime, id,
        } = elem;

        const To = document.createTextNode(`${receiveremail}`);
        const Subject = document.createTextNode(`${subject}`);
        const Status = document.createTextNode(`${senderstatus}`);
        const Taime = document.createTextNode(`${createdondate} ${createdontime}`);

        const sentArray = [To, Subject, Status, Taime];
        const tr = document.createElement('TR');

        const tbody = document.getElementById('sentBody');
        sentArray.forEach((cell) => {
          const td = document.createElement('TD');
          td.appendChild(cell);
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
        tr.onclick = () => {
          localStorage.setItem('messageId', id);
          const msgId = localStorage.messageId;
          const modalReq = new Request(`${sentHost}/messages/${msgId}`, {
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
    alert(err.message);
  }).catch((fetchErr) => {
    alert(fetchErr.message);
  }));
});

deleteBtn.onclick = () => {
  const smsId = localStorage.messageId;
  const delReq = new Request(`${sentHost}/messages/${smsId}`, {
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
      window.location.reload(sentmessages);
    }
  }).catch((erreur) => {
    para.innerHTML = erreur.message;
  }).catch((fetchErreur) => {
    para.innerHTML = fetchErreur.message;
  }));
};

searchInput.onkeyup = () => {
  const row = table.getElementsByTagName('tr');
  for (let i = 0; i < row.length; i += 1) {
    const data = row[i].getElementsByTagName('td')[0];
    if (data) {
      const txtValue = data.textContent || data.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        row[i].style.display = '';
      } else {
        row[i].style.display = 'none';
      }
    }
  }
};

const logOutBtn = document.getElementById('logoutBTN');
logOutBtn.onclick = () => {
  localStorage.clear();
  setTimeout(() => {
    window.location.href = '/login';
  }, 2000);
};
