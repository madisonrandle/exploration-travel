import $ from 'jquery';
import './css/main.scss';
import domUpdates from './domUpdates';

let userId;
let travelersData;
let singleTravelerData;
let tripsData;
let destinationsData;

const getTravelersData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
  .then(response => response.json())
  .then(travelersData => travelersData.travelers)
  .catch(error => console.log(`There was an error: ${error}`));

const getSingleTravelerData = () => {
  const url = 'https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/' + userId;
  fetch(url)
    .then(response => response.json())
    .then(singleTravelerData => singleTravelerData)
    .catch(error => console.log(`There was an error: ${error}`));
}

const getTripsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
  .then(response => response.json())
  .then(tripsData => tripsData.trips)
  .catch(error => console.log(`There was an error: ${error}`));

const getDestinationsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
  .then(response => response.json())
  .then(destinationsData => destinationsData.destinations)
  .catch(error => console.log(`There was an error: ${error}`));

Promise.all([getTravelersData, getSingleTravelerData, getTripsData, getDestinationsData])
  .then(data => {
    travelersData = data[0];
    singleTravelerData = data[1];
    tripsData = data[2];
    destinationsData = data[3];
  })
  .then(() => {
    domUpdates.showLogInForm();
    $('.submit-user-info').click((e) => submitLoginInHelper(e, travelersData, tripsData, destinationsData));
  })
  .catch(error => console.log(`There was an error: ${error}`));

const submitLoginInHelper = (e, travelersData, tripsData, destinationsData) => {
  e.preventDefault();
  userId = domUpdates.validateUser(e, travelersData, tripsData, destinationsData);
}


//
