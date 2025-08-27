const greeting = document.getElementById('greeting');
const nextBtn = document.getElementById('nextBtn');
const name = sessionStorage.getItem('userName') || 'Guest';
const place = sessionStorage.getItem('userPlace') || 'Unknown';

greeting.textContent = `Assalamu alikum ${name} from ${place}!`;

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    const manId = document.getElementById('manId')?.value || '0000';
    document.body.style.opacity = "0";
    setTimeout(() => {
      window.location.href = `top-scorers.html?manId=${manId}`;
    }, 500);
  });
}
