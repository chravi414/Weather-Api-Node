console.log('Ths client JS file loaded');

// fetch('https://jsonplaceholder.typicode.com/posts').then(response => {
//     response.json().then(json => {
//         console.log(json[0]);
//     })
// });

// fetch('http://localhost:5000/weather?location=Sattenapalle')
//     .then(response => {
//         response.json()
//             .then(json => {
//                 if(json['error']) {
//                     console.log(json['error']);
//                 } else {
//                     console.log(json['summary']);
//                 }

//             })
//     })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('.message-1');
const messageTwo = document.querySelector('.message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageTwo.textContent = '';
    messageOne.textContent ='Loading ....';
    const value = search.value;
    const url = `/weather?location=${value}`;
    fetch(url).then(response => {
        response.json().then(json => {
            if(json['error']) {
                messageOne.textContent = json['error'];
            } else {
                messageTwo.textContent = json['summary'];
                messageOne.textContent = json['location'];
            }
            search.value ='';
        })
    })    
})