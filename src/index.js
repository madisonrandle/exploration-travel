import $ from 'jquery';
import './css/main.scss';
import domUpdates from './domUpdates';

const getTravelersData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
  .then(response => response.json())
  .then(travelersData => {
    domUpdates.showLogInForm(travelersData.travelers)
    $('.submit-user-info').click((e) => formValidationHelper(e, travelersData.travelers));  // want to know why event listeners wont work in domUpdates??
  })
  .catch(error => console.log(`There was an error: ${error}`));

// const submitButtonHandler = (e, travelersData) => {
//   formValidationHelper(e, travelersData);
// }

const formValidationHelper = (e, travelersData) => {
  e.preventDefault();
  domUpdates.validateUser(e, travelersData);
}






//
