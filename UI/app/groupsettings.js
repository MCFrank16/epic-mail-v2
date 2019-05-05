const groupSHost = 'http://localhost:8080/api/v1';
const head = document.getElementById('spec');
const addBtn = document.getElementById('btnAdd');
const addInput = document.getElementById('add');
const removeInput = document.getElementById('remove');
const addRemove = document.getElementById('btnRemove');
const sendBtn = document.getElementById('btnbtn1');
const sendInput = document.getElementById('subject');
const draftBtn = document.getElementById('draftBtn');

const doc = document.addEventListener('DOMContentLoaded', () => {
  const setReq = new Request(`${groupSHost}/get/${localStorage.groupId}/membersnumber`, {
    method: 'GET',
    headers: {
      'x-access-token': localStorage.token,
    },
  });

  fetch(setReq).then(resp => resp.json().then((res) => {
    if (res.status === 404) {
      alert(res.message);
    } else if (res.status === 200) {
      const num = res.data.count;
      if (num <= 1) {
        head.innerHTML = `This Group has ${num} member`;
      } else {
        head.innerHTML = `This Group has ${num} members`;
      }
    }
  }).catch((err) => {
    alert(err.message);
  }).catch((fetchErr) => {
    alert(fetchErr.message);
  }));
});

addBtn.onclick = () => {
  const addReq = new Request(`${groupSHost}/groups/${localStorage.groupId}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
    },
    body: JSON.stringify({
      memberemail: addInput.value,
    }),
  });

  fetch(addReq).then(respo => respo.json().then((reso) => {
    if (reso.status !== 201) {
      console.log(reso.message);
    } else if (reso.status === 201) {
      alert('The user has been added successfully');
      addInput.innerHTML = '';
      window.location.reload(doc);
    }
  }).catch((erre) => {
    alert(erre.message);
  }).catch((fetchErre) => {
    alert(fetchErre);
  }));
};

addRemove.onclick = () => {
  const removeReq = new Request(`${groupSHost}/groups/delete/${localStorage.groupId}/users`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
    },
    body: JSON.stringify({
      memberemail: removeInput.value,
    }),
  });

  fetch(removeReq).then(respon => respon.json().then((resol) => {
    if (resol.status !== 200) {
      alert(resol.message);
    } else if (resol.status === 200) {
      alert('The user has been removed successfully');
      removeInput.innerHTML = '';
      window.location.reload(doc);
    }
  }).catch((errer) => {
    alert(errer.message);
  }).catch((fetchErrer) => {
    alert(fetchErrer);
  }));
};

sendBtn.onclick = () => {
  const sendReq = new Request(`${groupSHost}/groups/${localStorage.groupId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
    },
    body: JSON.stringify({
      subject: localStorage.groupTopic,
      message: sendInput.value,
    }),
  });

  fetch(sendReq).then(respo => respo.json().then((reso) => {
    if (reso.status === 404) {
      alert(reso.message);
    } else if (reso.status === 201) {
      sendInput.innerHTML = '';
      window.location.reload(doc);
    }
  }).catch((erre) => {
    alert(erre.message);
  }).catch((fetchErre) => {
    alert(fetchErre);
  }));
};

draftBtn.onclick = () => {
  const sendReq = new Request(`${groupSHost}/groups/${localStorage.groupId}/draft/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
    },
    body: JSON.stringify({
      subject: localStorage.groupTopic,
      message: sendInput.value,
    }),
  });

  fetch(sendReq).then(respo => respo.json().then((reso) => {
    if (reso.status === 404) {
      alert(reso.message);
    } else if (reso.status === 201) {
      alert('message drafted');
      sendInput.innerHTML = '';
      window.location.reload(doc);
    }
  }).catch((erre) => {
    alert(erre.message);
  }).catch((fetchErre) => {
    alert(fetchErre);
  }));
};
