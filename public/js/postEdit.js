document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
        if (event.target.matches('.edit-post-button')) {
            const postId = event.target.getAttribute('data-id');
            window.location.href = `/dashboard/postEdit/${postId}`;
        }
        else if (event.target.matches('.delete-post-button')) {
            const id = event.target.getAttribute('data-id');

            const response = fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            }).then(response => {
                if (response.ok) {
                    document.location.replace('/dashboard');
                } else {
                    alert('Failed to delete post');
                }
            });
        }
    });


    const editForm = document.querySelector('.edit-form');
    if (editForm) {
        editForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const id = editForm.getAttribute('data-id');
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
    }
});
