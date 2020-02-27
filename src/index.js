import $ from 'jquery';
import './css/main.scss';

let here;
let here;
let here;


const someData = fetch('')
  .then(someResponse => someResponse.json())
  .then(someData => someData.here)
  .catch(error => console.log('someData error'));

const someData = fetch('')
  .then(someResponse => someResponse.json())
  .then(someData => someData.here)
  .catch(error => console.log('someData error'));

const someData = fetch('')
  .then(someResponse => someResponse.json())
  .then(someData => someData.here)
  .catch(error => console.log('someData error'));

Promise.all([])
  .then(someData => {
    here = someData[0];
    here = someData[1];
    here = someData[2];
  })
  .catch(error => {console.log('Something is amiss with promise all', error)});


// //
