const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        const responseBody = await response.json();

        if (response.ok) {

          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
      } catch (error) {
        alert('an error occurred, plz try again');
      }
    }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
