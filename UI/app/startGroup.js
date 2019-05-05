const createHost = 'http://localhost:8080/api/v1';
const groupname = document.getElementById('groupName');
const topic = document.getElementById('subj');
const createBtn = document.getElementById('btnbtn1');
const cancelBtn = document.getElementById('cancelBtn');
const alertError = document.getElementById('alertError');

createBtn.onclick = () => {
  const req = new Request(`${createHost}/groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.token,
    },
    body: JSON.stringify({
      GroupName: groupname.value,
      Topic: topic.value,
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
      alertError.innerHTML = `${groupname.value} have been created`;
      alertError.style.backgroundColor = 'green';
      alertError.style.display = 'block';
      setTimeout(() => {
        alertError.style.display = 'none';
        alertError.innerHTML = '';
        window.location.reload();
      }, 2000);
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
};
