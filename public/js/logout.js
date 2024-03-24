document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/login');
      } else {
        alert('Failed to log out.');
      }
    });
  } else {
    console.error('Logout button not found');
  }
});
