const greeting = document.getElementById('greeting');
const nextBtn = document.getElementById('nextBtn');

const name = sessionStorage.getItem('userName') || 'Guest';
const place = sessionStorage.getItem('userPlace') || '';

greeting.textContent = place ? `Assalamu alikum ${name} from ${place}!` : `Assalamu alikum ${name}!`;

nextBtn.addEventListener('click', () => {
  const manId = document.getElementById('manId').value || '0000';
  window.location.href = 'top-scorers.html';
});
