const greeting = document.getElementById('greeting');
const name = sessionStorage.getItem('userName') || 'ضيف';
greeting.textContent = `Assalamu alikum ${name}`;
const nextBtn = document.getElementById('nextBtn');

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    const manId = document.getElementById('manId').value; // optional
    window.location.href = `top-scorers.html?manId=${manId}`;
  });
}
