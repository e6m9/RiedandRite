document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');

    if (commentForm) {
        commentForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const postId = window.location.pathname.split('/').pop();
            const body = document.getElementById('comment').value.trim();

            if (body) {
                const response = await fetch('/api/comments', {
                    method: 'POST',
                    body: JSON.stringify({
                        postId,
                        body
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    document.getElementById('comment').value = '';
                    window.location.reload();
                } else {
                    alert('failed to submit, plz log in');
                }
            }
        });
    }
});