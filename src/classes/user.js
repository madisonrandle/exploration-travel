import $ from 'jquery';
import domUpdates from '../domUpdates';

let traveler;
let foundTraveler;

class User {
  constructor (travelers, trips, destinations, today) {
    this.travelers = travelers;
    this.trips = trips;
    this.destinations = destinations;
    this.today = today;
  };

  validateUser(e) {
    e.preventDefault();
    foundTraveler = this.travelers.find(traveler => {
      return $('.username').val() === `traveler${traveler.id}` && $('.password').val() === 'travel2020'
    });
    if (foundTraveler) {

      domUpdates.getTravelerAccess(this.travelers, this.trips, this.destinations, foundTraveler);

      return foundTraveler.id;
    } else {
      $('.username').val() === 'agency' && $('.password').val() === 'travel2020' ? domUpdates.getAgentAccess() : domUpdates.showErrorMessage();
    }
  };




}

export default User;
