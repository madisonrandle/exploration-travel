import $ from 'jquery';
import './css/main.scss';
import domUpdates from './domUpdates';

const getTravelersData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
  .then(response => response.json())
  .then(travelersData => {
    domUpdates.showLogIn(travelersData.travelers)
    $('.submit-user-info').click(domUpdates.validateUser);  // want to know why this wont work in domUpdates??
  })
  .catch(error => console.log(`There was an error: ${error}`));

//
