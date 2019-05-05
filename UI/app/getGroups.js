const groupHost = 'http://localhost:8080/api/v1';

document.addEventListener('DOMContentLoaded', () => {
  const req = new Request(`${groupHost}/get/groups`, {
    method: 'GET',
    headers: {
      'x-access-token': localStorage.token,
    },
  });

  fetch(req).then(resp => resp.json().then((res) => {
    if (res.status === 400) {
      alert(res.message);
    } else if (res.status === 200) {
      const { data } = res;
      data.forEach((elem) => {
        const {
          groupname, topic, createdon, id,
        } = elem;

        const gName = document.createTextNode(`${groupname}`);
        const toopic = document.createTextNode(`${topic}`);
        const create = document.createTextNode(`${createdon}`);

        // creation of the two button on each table data
        const viewbtn = document.createElement('A');
        const deletebtn = document.createElement('A');
        deletebtn.style.backgroundColor = 'crimson';
        const div = document.createElement('DIV');
        div.className = 'tile_div';
        const txtView = document.createTextNode('View');
        const txtdelete = document.createTextNode('Delete');
        viewbtn.appendChild(txtView);
        deletebtn.appendChild(txtdelete);
        div.appendChild(viewbtn);
        div.appendChild(deletebtn);

        const theArray = [gName, toopic, create, div];
        const trow = document.createElement('TR');
        const bodyTable = document.getElementById('myGroupBody');
        theArray.forEach((el) => {
          const tdata = document.createElement('TD');
          tdata.appendChild(el);
          trow.appendChild(tdata);
        });
        bodyTable.appendChild(trow);
        viewbtn.onclick = () => {
          localStorage.setItem('groupId', id);
          localStorage.setItem('groupTopic', topic);
          window.location.href = `mygroup/${localStorage.groupId}`;
        };
      });
    }
  }).catch((err) => {
    alert(err.message);
  }).catch((fetchErr) => {
    alert(fetchErr);
  }));
});
