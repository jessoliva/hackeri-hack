async function postFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#description').value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#create-post-btn').addEventListener('click', postFormHandler);


