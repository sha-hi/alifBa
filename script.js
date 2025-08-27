// Run after HTML is parsed because of "defer"
(() => {
  const correctOrder = [
    'ا','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ك','ل','م','ن','ه','و','ي'
  ];

  const colors = [
    '#f87171','#facc15','#34d399','#60a5fa','#a78bfa','#f472b6','#fb923c',
    '#4ade80','#fcd34d','#38bdf8','#818cf8','#f43f5e','#2dd4bf','#e879f9',
    '#fbbf24','#a3e635','#c084fc','#fca5a5','#7dd3fc','#fcd34d','#86efac'
  ];

  let currentIndex = 0;
  let score = 0;
  let startTime = 0;
  let timerInterval = null;

  const letterBox = document.getElementById('letterBox');
  const selectedBox = document.getElementById('selectedBox');
  const scoreEl = document.getElementById('score');
  const timerEl = document.getElementById('timer');
  const resetBtn = document.getElementById('resetBtn');

  // Fisher–Yates shuffle (unbiased)
  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function renderLetters() {
    const shuffled = shuffle(correctOrder);
    letterBox.innerHTML = '';

    shuffled.forEach((letter, idx) => {
      const tile = document.createElement('div');
      tile.className = 'letter';
      tile.textContent = letter;
      tile.style.backgroundColor = colors[idx % colors.length];
      tile.addEventListener('click', () => handleLetterClick(tile, letter), { once: false });
      letterBox.appendChild(tile);
    });
  }

  function handleLetterClick(tile, letter) {
    if (currentIndex === 0 && startTime === 0) startTimer();

    if (letter === correctOrder[currentIndex]) {
      // correct pick
      const clone = tile.cloneNode(true);
      clone.onclick = null;
      selectedBox.appendChild(clone);
      tile.style.visibility = 'hidden';
      currentIndex++;
      score++;
    } else {
      // wrong pick
      score--;
      tile.style.backgroundColor = '#fecaca';
    }

    updateScore();

    if (currentIndex === correctOrder.length) {
      stopTimer();
      // optional: prevent any more clicks doing anything
      Array.from(letterBox.children).forEach(el => el.style.pointerEvents = 'none');
    }
  }

  function updateScore() {
    scoreEl.textContent = `النتيجة: ${score}`;
  }

  function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // reflect immediately
  }

  function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timerEl.textContent = `الوقت: ${elapsed} ثانية`;
  }

  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function resetSelection() {
    currentIndex = 0;
    score = 0;
    startTime = 0;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;

    timerEl.textContent = 'الوقت: 0 ثانية';
    selectedBox.innerHTML = '';
    updateScore();
    renderLetters();
  }

  // hook up the reset button without inline JS
  resetBtn.addEventListener('click', resetSelection);

  // initial render
  renderLetters();
})();
