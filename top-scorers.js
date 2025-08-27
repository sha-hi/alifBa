const topScorers = JSON.parse(sessionStorage.getItem('topScorers')) || [
  { name: 'Ali', points: 15 },
  { name: 'Fatima', points: 20 },
  { name: 'Hassan', points: 25 }
];

// Get user details
const userName = sessionStorage.getItem('userName');
const userPoints = parseInt(sessionStorage.getItem('userPoints')) || 0;

if (userName && userName.trim() !== "") {
  const existingUser = topScorers.find(u => u.name === userName);

  if (existingUser) {
    // Update score (choose MAX to avoid downgrading, or += if cumulative)
    existingUser.points = Math.max(existingUser.points, userPoints);
  } else {
    topScorers.push({ name: userName, points: userPoints });
  }

  // Save back
  sessionStorage.setItem('topScorers', JSON.stringify(topScorers));
}

// Render leaderboard
const tbody = document.querySelector('.score-table tbody');
tbody.innerHTML = '';

topScorers
  .sort((a, b) => b.points - a.points)
  .slice(0, 3) // show top 3
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

// Next button
document.getElementById('nextBtn').addEventListener('click', () => {
  window.location.href = 'game page.html';
});
