document.querySelector('.edit-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // If using data-id on the form
    const id = document.querySelector('.edit-form').getAttribute('data-id');

    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-body').value.trim();

    if (title && body) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, body }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to edit post');
        }
    }
});