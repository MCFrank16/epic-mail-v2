/* eslint-disable no-undef */
function myFunctionS() {
  // Declare variables
  const input = document.getElementById('myInput1');
  const filter = input.value.toUpperCase();
  const table = document.getElementById('myTable1');
  const tr = table.getElementsByTagName('TR');

  // Loop through all table rows, and hide those who don't match the search query
  for (let i = 0; i < tr.length; i += 1) {
    const td = tr[i].getElementsByTagName('TD')[0];
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

function myFunctionGr() {
  // Declare variables
  const input = document.getElementById('myInput1');
  const filter = input.value.toUpperCase();
  const table = document.getElementById('myTable1');
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
