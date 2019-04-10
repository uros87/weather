const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = 'Loading..';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    messageFour.textContent = '';

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else {
                messageOne.textContent = `${data.location}`
                messageTwo.textContent = `Date: ${data.timeData}`
                messageThree.textContent = `Currently: ${data.currentSummary}. Temp: ${data.todayMaxTemp}`;    
                messageFour.textContent = `Daily prognosis: ${data.todaySummary}`
            }
        })   
    });
    

})


