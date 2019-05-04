const inboxHost = 'http://localhost:8080/api/v1';
const tableau = document.getElementById('myTable1');
// const inboxNum = document.getElementById('inboxSpan');
// const subject1 = document.getElementById('spec');
// const too = document.getElementById('para');
// const msg = document.getElementById('bodyMessage');


/* the data should be retrieved and saved
into the table
only when the document is loaded */

document.addEventListener('DOMContentLoaded', () => {
  const inboxReq = new Request(`${inboxHost}/messages/inbox`, {
    method: 'GET',
    headers: {
      'x-access-token': localStorage.token,
    },
  });

  fetch(inboxReq).then(resp => resp.json().then((res) => {
    if (res.status === 400) {
      alert(res.message);
    } else if (res.status === 200) {
      const { data } = res;
      data.forEach((elem) => {
        const {
          senderfirstname, senderlastname,
          subject, receiverstatus, createdontime, createdondate,
          parentmessageid, id,
        } = elem;

        const From = document.createTextNode(`${senderfirstname} ${senderlastname}`);
        const Subject = document.createTextNode(`${subject}`);
        const Status = document.createTextNode(`${receiverstatus}`);
        const Taime = document.createTextNode(`${createdondate} ${createdontime}`);

        const inboxArray = [From, Subject, Status, Taime];
        const tr = document.createElement('TR');

        const tbody = document.getElementById('inboxTable');
        inboxArray.forEach((cell) => {
          const td = document.createElement('TD');
          td.appendChild(cell);
          tr.appendChild(td);
        });
        // const rowArray = [tableau.rows];
        // rowArray.forEach((x) => {
        //   for (let i = 0; i < x.length; i += 1) {
        //     const m = x[i].cells[2].innerHTML;
        //     tableau.rows[0].cells[2].bold();
        //     // if (m === 'unread') {
        //     //   x[i].cells.bold();
        //     // }
        //   }
        // });
        tbody.appendChild(tr);
        tr.onclick = () => {
          localStorage.setItem('parentMessageId', parentmessageid);
          localStorage.setItem('messageId', id);
          const readReq = new Request(`${inboxHost}/update/${localStorage.messageId}/read`, {
            method: 'PUT',
            headers: {
              'x-access-token': localStorage.token,
            },
          });
          fetch(readReq).then(respond => respond.json().then((rex) => {
            if (rex.status === 404) {
              alert(rex.message);
            } else if (rex.status === 200) {
              window.location.href = `inbox/${parentmessageid}`;
            }
          }).catch((era) => {
            alert(era.message);
          }).catch((fetchEra) => {
            alert(fetchEra.message);
          }));
        };
      });
      // alert(tableau.rows.cells.item(0).innerHTML);
      // inboxNum.innerHTML = rowCount;
    }
  }).catch((err) => {
    alert(err.message);
  }).catch((fetchError) => {
    alert(fetchError.message);
  }));
});

const logOutBtn = document.getElementById('logoutBTN');
logOutBtn.onclick = () => {
  localStorage.clear();
  setTimeout(() => {
    window.location.href = '/login';
  }, 2000);
};
