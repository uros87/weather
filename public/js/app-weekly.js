const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');
const messageFive = document.querySelector('#message-5');
const messageSix = document.querySelector('#message-6');
const messageSeven = document.querySelector('#message-7');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = 'Loading..';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    messageFour.textContent = '';

    fetch(`/weather2?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else {
                messageOne.textContent = `${data.location}`
                messageTwo.textContent = `On ${data.nextDay} Prognosis: ${data.nextDaySummary} ${data.nextDayMaxTemp}`
                messageThree.textContent = `On ${data.secondDay} Prognosis: ${data.secondDaySummary} ${data.secondDayMaxTemp} `
                messageFour.textContent = `On: ${data.thirdDay} Prognosis: ${data.thirdDaySummary} ${data.thirdDayMaxTemp}`
                messageFive.textContent = `On: ${data.fourthDay} Prognosis: ${data.fourthDaySummary} ${data.fourthDayMaxTemp} `
                messageSix.textContent = `On: ${data.fifthDay} Prognosis: ${data.fifthDaySummary} ${data.fifthDayMaxTemp} `
                messageSeven.textContent = `On: ${data.sixthDay} Prognosis: ${data.sixthDaySummary} ${data.sixthDayMaxTemp}`
            }
        })   
    });
    

})


