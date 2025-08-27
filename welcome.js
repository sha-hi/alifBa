const nextBtn = document.getElementById('nextBtn');
const nameInput = document.getElementById('nameInput');
const placeInput = document.getElementById('placeInput');
const errorMsg = document.getElementById('errorMsg');

function goToNextPage() {
  const name = nameInput.value.trim();
  const place = placeInput.value.trim();

  if(name && place) {
    sessionStorage.setItem('userName', name);
    sessionStorage.setItem('userPlace', place);
    window.location.href = 'greet.html';
  } else {
    errorMsg.textContent = "⚠️ Please enter both your name and place";
  }
}

// Button click
nextBtn.addEventListener('click', goToNextPage);

// Enter key support
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    goToNextPage();
  }
});
