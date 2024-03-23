const editFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-body').value.trim();

    const id = event.target.getAttribute('data-id');

    const response = await fetch('/api/post/${id}', {
        method: 'PUT',
        body: JSON.stringify({ post_id: id, title, body }),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('failed to edit post');
    }
}

document.querySelector('.edit-form').addEventListener('submit', editFormHandler);