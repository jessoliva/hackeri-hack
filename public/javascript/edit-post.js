async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value.trim();
    const content = document.querySelector('#description').value.trim();
    const created_at = new Date();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(title, content, id);

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content,
            created_at
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } 
    else {
        alert(response.statusText);
    }
}
  
document.querySelector('#update-post-btn').addEventListener('click', editFormHandler);