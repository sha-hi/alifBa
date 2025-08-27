const nextBtn = document.getElementById('nextBtn');
const nameInput = document.getElementById('nameInput');

nextBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if(name) {
    // Save name in sessionStorage and go to next page
    sessionStorage.setItem('userName', name);
    window.location.href = 'greet.html';
  } else {
    alert('الرجاء إدخال اسمك');
  }
});
