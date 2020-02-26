// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/main.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//

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


//
