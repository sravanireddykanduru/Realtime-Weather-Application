function getDayName(num) {
    switch (num) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'


        default:
            break;
    }
}

// selected HTML elements
const temperatureField = document.querySelector('.temp');
const cityField = document.querySelector('.time_location p');
const dateField = document.querySelector('.time_location span');
const emojiField = document.querySelector('.weather_condition img');
const weatherField = document.querySelector('.weather_condition span');
const form = document.querySelector('form')
const searchField = document.querySelector('.searchField');

// on form submit , get input vaue and pass to API.
form.addEventListener('submit', handleSearch);

function handleSearch(ev) {
    console.log('Form submitted..')
    ev.preventDefault(); // dont handle the event (form submission) the way you do.

    target = searchField.value;
    getData(target);
}

function updateDOM(locationName, localTime, temp, conditionName, conditionEmoji) {
    // localTime = '2024-09-12 09:15'
    // split converts to array. ['2024-09-12', '09:15'];
    const exactDate = localTime.split(' ')[0];
    const exactTime = localTime.split(' ')[1];

    const dayNumber = new Date(localTime).getDay();
    const exactDay = getDayName(dayNumber);




    temperatureField.innerText = temp;
    cityField.innerText = locationName;
    // dateField.innerText = exactTime + '-' + exactDay + ' ' + exactDate;
    dateField.innerText = `${exactTime} – ${exactDay} – ${exactDate}`
    emojiField.src = conditionEmoji;
    weatherField.innerText = conditionName;
}

async function getData(target) {
    // API CALL.
    const url = `https://api.weatherapi.com/v1/current.json?key=7deee5c09c084e79999185404241206&q=${target}&aqi=no`
    try {
        const response = await fetch(url);
        console.log("response", response)
        const data = await response.json();

        // response fields..
        const locationName = data.location.name;
        const localTime = data.location.localtime; // '2024-09-12 09:15'
        const temp = data.current.temp_c;
        const conditionName = data.current.condition.text;
        const conditionEmoji = data.current.condition.icon;

        // tell your HTML, that new response have come....
        updateDOM(locationName, localTime, temp, conditionName, conditionEmoji)

    } catch (error) {
        console.error("ERROR ::: ", error.message);
        alert('Kindly enter valid city name')
    }
}

getData('New Delhi')