const currentTime = document.querySelector('#current-time');
const setHours = document.querySelector('#hours');
const setMinutes = document.querySelector('#minutes');
const setSeconds = document.querySelector('#seconds');
const setAmPm = document.querySelector('#am-pm');
const setAlarmButton = document.querySelector('#submitButton');
const alarmContainer = document.querySelector('#alarms-container');

// Adding Hours, Minutes, Seconds in DropDown Menu
window.addEventListener('DOMContentLoaded', (event) => {
    dropDownMenu(1, 12, setHours);
    dropDownMenu(0, 59, setMinutes);
    dropDownMenu(0, 59, setSeconds);
    
    setInterval(getCurrentTime, 1000);
    fetchAlarm();
});

// Event Listener added to Set Alarm Button
setAlarmButton.addEventListener('click', getInput);

function dropDownMenu(start, end, element){
    for(let i = start; i <= end; i++){
        const dropDown = document.createElement('option');
        dropDown.value = i < 10 ? '0' + i : i;
        dropDown.innerHTML = i < 10 ? '0' + i : i;
        element.appendChild(dropDown);
    }
}

// get current time 

function getCurrentTime() {
    let time = new Date();
    time = time.toLocaleTimeString('en-US',{
        hour : 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    })
    currentTime.innerHTML = time;
    return time;
}

// get input
function getInput(e) { //e = event
    e.preventDefault();
    const hourValue = setHours.value;
    const minuteValue = setMinutes.value;
    const secondValue = setSeconds.value;
    const amPmValue = setAmPm.value;

    const alarmTime = convertToTime(
        hourValue,
        minuteValue,
        secondValue,
        amPmValue
    );
    setAlarm(alarmTime);
}

// converting time to 24 hour format
function convertToTime(hour, minute, second, amPm){
    return `${parseInt(hour)} : ${minute} : ${second} ${amPm}`;
}

function setAlarm(time, fetching = false){
    const alarm = setInterval(() => {
        if(time === getCurrentTime()){
            alert('Alarm Ringing');
        }
        console.log('Running');
    },500);
    addAlaramToDom(time, alarm);
    if(!fetching){
        saveAlarm(time);
    }
}

// Alarms set by user Displayed in HTML
function addAlaramToDom(time, intervalId) {
    const alarm = document.createElement("div");
    alarm.classList.add("alarm", "mb", "d-flex");
    alarm.innerHTML = `
                <div class="time">${time}</div>
                <button class="btn delete-alarm" data-id=${intervalId}>Delete</button>
                `;
    const deleteButton = alarm.querySelector(".delete-alarm");
    deleteButton.addEventListener("click", (e) => deleteAlarm(e, time, intervalId));
  
    alarmContainer.prepend(alarm);
  }


// check alarms in Local Storage 

function checkAlarams() {
    let alarms = [];
    const isPresent = localStorage.getItem('alarms');
    if(isPresent) alarm = JSON.parse(isPresent);
    return alarms;
}

// Save Alarm To Local Storage
function saveAlarm(time) {
    const alarms = checkAlarams();
    alarms.push(time);
    localStorage.setItem('alarms', JSON.stringify(alarms));
}

// Fetch Alarms From Local Storage
function fetchAlarm() {
    const alarms = checkAlarams();
    
    alarms.forEach((time) => {
        setAlarm(time, true);
    });
}





