const commentFormHandler = async (event) => {
    event.preventDefault();

    const commentBody = document.querySelector('#comment-body').value.trim();

    const id = event.target.getAttribute('data-id');

    if (commentBody) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ id, commentBody }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);