async function logout() {

    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } 
    else {
        alert(response.statusText);
    }
}
document.querySelector('#logout').addEventListener('click', logout);

// modal element
const modalEl = document.querySelector('#generate-modal');

// CREDIT
// https://stackoverflow.com/questions/667555/how-to-detect-idle-time-in-javascript

async function logoutRes() {
    const logoutResponse = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (logoutResponse.ok) {

        setTimeout(() => {
           // display modal
           modalEl.classList.add("show");
           modalEl.classList.remove("hide");
        }, 3000);

        setTimeout(() => {
            // close modal
            modalEl.classList.add("hide");
            modalEl.classList.remove("show");
            document.location.replace('/');
        }, 3000);
    } 
    else {
        alert(logoutResponse.statusText);
    }
};

// logout user when inactive for a certain amount of time
function inactivityLogout() {
    var time;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;  // touchscreen presses    
    window.ontouchstart = resetTimer; // touchscreen swipes    
    window.ontouchmove = resetTimer;  // required by some devices 
    window.onclick = resetTimer;      // touchpad clicks
    window.onkeydown = resetTimer;   
    window.addEventListener('scroll', resetTimer, true);

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logoutRes, 1800000);  // 30min
    };
};
inactivityLogout();



// function closeModal(event) {
//     event.preventDefault();
    
//     // close modal
//     modalEl.classList.add("hide");
//     modalEl.classList.remove("show");

//     document.location.reload();
// }
// document.querySelector('#close-modal').addEventListener('click', closeModal);