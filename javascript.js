const time_el = document.getElementById('timeDisplay');
const start_btn = document.getElementById('Start');
const stop_btn = document.getElementById('Stop');
const reset_btn = document.getElementById('Reset');
const lap_btn = document.getElementById('Lap');
const toggleSwitch = document.getElementById('toggleSwitch');
const toggleLabel = document.querySelector('.toggle-label');
const lapList = document.getElementById('lapList');

let seconds = 0;
let interval = null;

start_btn.addEventListener('click', start);
stop_btn.addEventListener('click', stop);
reset_btn.addEventListener('click', reset);
lap_btn.addEventListener('click', lap);
toggleSwitch.addEventListener('change', toggleDarkMode);
toggleSwitch.addEventListener('change', toggleLightMode);

lapList.addEventListener('click', function (event) {
    const clickedButton = event.target.closest('li button');
    if (clickedButton) {
        removeLap(clickedButton); 
    }
});

    

function timer() {
    seconds++;

    let secs = seconds % 60;
    let mins = Math.floor((seconds - secs) / 60);
    let hrs = Math.floor(mins / 60);

    secs = secs < 10 ? '0' + secs : secs;
    mins = mins < 10 ? '0' + mins : mins;
    hrs = hrs < 10 ? '0' + hrs : hrs;

    time_el.innerText = `${hrs}:${mins}:${secs}`;
}

function start() {
    if (interval) {
        return;
    }
    interval = setInterval(timer, 1000);

    stop_btn.style.display = 'inline-block';
    lap_btn.style.display = 'inline-block';
    start_btn.style.display = 'none';
    reset_btn.style.display = 'none';
}

function stop() {
    clearInterval(interval);
    interval = null;

    start_btn.style.display = 'inline-block';
    reset_btn.style.display = 'inline-block';
    stop_btn.style.display = 'none';
    lap_btn.style.display = 'none';
}

function reset() {
    stop();
    seconds = 0;
    time_el.innerText = '00:00:00';

    start_btn.style.display = 'inline-block';
    lap_btn.style.display = 'inline-block';
    stop_btn.style.display = 'none';
    reset_btn.style.display = 'none';

    lapList.innerHTML = '';
}

function lap() {
    const lapEntry = document.createElement('li');
    
    const lapNumber = lapList.childElementCount + 1;

    lapEntry.innerHTML = `<span>Lap ${lapNumber}</span><button onclick="removeLap(this)">Remove</button>`;
    
    lapList.appendChild(lapEntry);
    lapEntry.classList.add('added');
}



function removeLap(button) {
    const lapEntry = button.parentNode;
    lapEntry.classList.add('remove');
    setTimeout(() => {
        lapList.removeChild(lapEntry);
    }, 300); 
}


function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.getElementById('watch').classList.toggle('dark-mode');
    toggleLabel.innerText = toggleSwitch.checked ? 'Dark Mode' : 'Light Mode';
}

function toggleLightMode(){
    document.body.classList.toggle('light-mode');
    document.getElementById('watch').classList.toggle('light-mode');
    toggleLabel.innerText = toggleSwitch.checked ? 'Light Mode' : 'Dark Mode';
}
