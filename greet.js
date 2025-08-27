const greeting = document.getElementById('greeting');
const name = sessionStorage.getItem('userName') || 'ضيف';
greeting.textContent = `Assalamu alikum ${name}`;
