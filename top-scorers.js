const topScorers = JSON.parse(sessionStorage.getItem('topScorers')) || [
  { name: 'Ali', points: 15 },
  { name: 'Fatima', points: 20 },
  { name: 'Hassan', points: 25 }
];

const userName = sessionStorage.getItem('userName');
const userPoints = parseInt(sessionStorage.getItem('userPoints')) || 0;

if (userName && userName.trim() !== "") {
  const existingUser = topScorers.find(u => u.name === userName);
  if (existingUser) {
    existingUser.points = Math.max(existingUser.points, userPoints);
  } else {
    topScorers.push({ name: userName, points: userPoints });
  }
  sessionStorage.setItem('topScorers', JSON.stringify(topScorers));
}

const tbody = document.querySelector('.score-table tbody');
tbody.innerHTML = '';

topScorers
  .sort((a, b) => b.points - a.points)
  .slice(0, 3)
  .forEach((user, index) => {
    const tr = document.createElement('tr');
    if (user.name === userName) tr.classList.add('current-user');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.points}</td>
    `;
    tbody.appendChild(tr);
  });

document.getElementById('nextBtn').addEventListener('click', () => {
  window.location.href = 'game-selection.html';
});
