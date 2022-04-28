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

function closeModal(event) {
    event.preventDefault();
    
    // close modal
    modalEl.classList.add("hide");
    modalEl.classList.remove("show");

    document.location.reload();
}
document.querySelector('#close-modal').addEventListener('click', closeModal);

// CREDIT
// https://stackoverflow.com/questions/667555/how-to-detect-idle-time-in-javascript

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

    async function yourFunction() {
        const response = await fetch('/api/users/logout', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' }
        });
    
        if (response.ok) {
            // display modal
            modalEl.classList.add("show");
            modalEl.classList.remove("hide");
        } 
        else {
            alert(response.statusText);
        }
    };

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(yourFunction, 1800000);  // 30min
    };
};
inactivityLogout();