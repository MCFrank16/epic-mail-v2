/* eslint-disable no-undef */
function myFunction() {
  // Get the snackbar DIV
  // eslint-disable-next-line no-undef
  const x = document.getElementById('snackbar');

  // Add the "show" class to DIV
  x.className = 'show';

  // After 3 seconds, remove the show class from DIV
  setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);
}

function myFunction2() {
  // Get the snackbar DIV
  // eslint-disable-next-line no-undef
  const x = document.getElementById('snackbar2');

  // Add the "show" class to DIV
  x.className = 'show';

  // After 3 seconds, remove the show class from DIV
  setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);
}

function myFunction3() {
  // Get the snackbar DIV
  const x = document.getElementById('snackRetract');

  // Add the "show" class to DIV
  x.className = 'show';

  // After 3 seconds, remove the show class from DIV
  setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);
}

function myFunctionS() {
  // Declare variables
  const input = document.getElementById('myInput1');
  const filter = input.value.toUpperCase();
  const table = document.getElementById('myTable');
  const tr = table.getElementsByTagName('tr');

  // Loop through all table rows, and hide those who don't match the search query
  for (let i = 0; i < tr.length; i += 1) {
    const td = tr[i].getElementsByTagName('td')[0];
    if (td) {
      const txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}
