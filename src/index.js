import $ from 'jquery';
import './css/main.scss';
import domUpdates from './domUpdates';

const getTravelersData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
  .then(response => response.json())
  .then(travelersData => {
    domUpdates.showLogInForm(travelersData.travelers)
    $('.submit-user-info').click((e) => submitLoginInfoHelper(e, travelersData.travelers));
   // want to know why event listeners ^ wont work in domUpdates??
  })
  .catch(error => console.log(`There was an error: ${error}`));

// const getSingleTravelerData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/???')
//   .then(response => response.json())
//   .then(data => data.???)
//   .catch(error => console.log(`There was an error: ${error}`));
//
// const getTripsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
//   .then(response => response.json())
//   .then(data => data.trips)
//   .catch(error => console.log(`There was an error: ${error}`));
//
// Promise.all([getTravelersData, getSingleTravelerData, getTripsData])
//   .then(data => {
//     travelersData = data[0];
//     singleTravelerData = data[1];
//     tripsData = data[2];
//   })

const submitLoginInfoHelper = (e, travelersData) => {
  e.preventDefault();

  domUpdates.validateUser(e, travelersData);
}




//
