import $ from 'jquery';
import './css/main.scss';
import domUpdates from './domUpdates';
import User from './classes/user';
import moment from 'moment';

// console.log('timskiez', moment()._d);
// console.log(Date.now());

let today, user, id;

// ^ be sure you're using the 'today' variable and property before submitting project

const getTravelersData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
  .then(response => response.json())
  .then(getTravelers => getTravelers.travelers)
  .catch(error => console.log(`There was an error: ${error}`));

// const getTravelerData = () => {
//   const url = 'https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/' + id;
//   fetch(url)
//     .then(response => response.json())
//     .then(getTraveler => getTraveler)
//     .catch(error => console.log(`There was an error: ${error}`));
// }

const getTripsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
  .then(response => response.json())
  .then(getTrips => getTrips.trips)
  .catch(error => console.log(`There was an error: ${error}`));

const getDestinationsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
  .then(response => response.json())
  .then(getDestinations => getDestinations.destinations)
  .catch(error => console.log(`There was an error: ${error}`));

Promise.all([getTravelersData, getTripsData, getDestinationsData])
  .then(data => {
    let getTravelers = data[0];
    let getTrips = data[1];
    let getDestinations = data[2];
    user = new User(getTravelers, getTrips, getDestinations, today);
    domUpdates.showLogInForm(user);
  })
  .catch(error => console.log(`There was an error: ${error}`));

// the id here will be used added with concatination to fetch from the correct getTravelerData endpoint:
    // const findID = (e) => id = user.validateUser(e);
