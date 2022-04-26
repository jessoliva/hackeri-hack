async function signupFormHandler(event) {
    event.preventDefault();

    // get user input values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // a conditional to make sure that all fields have values before making the POST request
    if (username && email && password) {

        // making request to /api/users route
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        console.log(response);
    
        // Now we can add error handling by using the .ok property on the response object
        if (response.ok) {
            console.log('success');
            document.location.replace('/');
        } 
        else {
            alert(response.statusText);
        }
    }
};
document.querySelector('#sign-up-form').addEventListener('submit', signupFormHandler);

// Jessica Olivares
// jessoliva
// hi@gmail.com
// 1234567