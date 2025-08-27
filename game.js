const correctOrder = ['ا','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ك','ل','م','ن','ه','و','ي'];
const colors = [
  '#f87171','#facc15','#34d399','#60a5fa','#a78bfa','#f472b6','#fb923c',
  '#4ade80','#fcd34d','#38bdf8','#818cf8','#f43f5e','#2dd4bf','#e879f9',
  '#fbbf24','#a3e635','#c084fc','#fca5a5','#7dd3fc','#fcd34d','#86efac'
];

let currentIndex = 0;
let score = 0;
let startTime = 0;
let timerInterval = null;
let lastClickTime = null;
let wrongClicks = 0;

const letterBox = document.getElementById('letterBox');
const selectedBox = document.getElementById('selectedBox');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const wrongEl = document.getElementById('wrong');
const resetBtn = document.getElementById('resetBtn');
const finishBtn = document.getElementById('finishBtn');

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function renderLetters() {
  const shuffled = shuffleArray([...correctOrder]);
  letterBox.innerHTML = '';
  shuffled.forEach((letter, index) => {
    const span = document.createElement('div');
    span.className = 'letter';
    span.textContent = letter;
    span.style.backgroundColor = colors[index % colors.length];
    span.onclick = () => handleLetterClick(span, letter);
    letterBox.appendChild(span);
  });
}

function handleLetterClick(span, letter) {
  const now = Date.now();

  if (letter === correctOrder[currentIndex]) {
    // Correct click
    if (currentIndex === 0) {
      // First click: no points
      lastClickTime = now;
    } else {
      const elapsed = (now - lastClickTime) / 1000; // seconds
      let points = 1; // default minimum

      if (elapsed < 1) points = 7;
      else if (elapsed < 2) points = 5;
      else if (elapsed < 3) points = 3;
      else if (elapsed < 4) points = 2;

      score += points;
      lastClickTime = now;
    }

    // Move letter to selected box
    const clone = span.cloneNode(true);
    clone.onclick = null;
    selectedBox.appendChild(clone);
    span.style.visibility = 'hidden';
    currentIndex++;

  } else {
    // Wrong click
    score -= 2;
    if (score < 0) score = 0; // prevent negative score
    wrongClicks++;
    span.style.backgroundColor = '#fecaca';
    setTimeout(() => {
      span.style.backgroundColor = colors[correctOrder.indexOf(letter) % colors.length];
    }, 300);
  }

  updateScore();
  updateWrong();

  if (currentIndex === correctOrder.length) stopTimer();
}

function updateScore() {
  scoreEl.textContent = `Score: ${score}`;
}

function updateWrong() {
  wrongEl.textContent = `Wrong Attempts: ${wrongClicks}`;
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  timerEl.textContent = `Time: ${elapsed} seconds`;
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetSelection() {
  currentIndex = 0;
  score = 0;
  startTime = 0;
  lastClickTime = null;
  wrongClicks = 0;
  clearInterval(timerInterval);
  timerEl.textContent = `Time: 0 seconds`;
  selectedBox.innerHTML = '';
  updateScore();
  updateWrong();
  renderLetters();
}

resetBtn.addEventListener('click', resetSelection);

finishBtn.addEventListener('click', () => {
  sessionStorage.setItem('userPoints', score);
  window.location.href = 'top-scorers.html';
});

// Initialize game
renderLetters();
