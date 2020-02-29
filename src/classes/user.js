import $ from 'jquery';
import domUpdates from '../domUpdates';
import moment from 'moment';

let foundTraveler;

class User {
  constructor (user) {
    this.travelers = user.getTravelers;
    this.trips = user.getTrips;
    this.destinations = user.getDestinations;
  };

  validateUser(e) {
    foundTraveler = this.travelers.find(traveler => {
      return $('.username').val() === `traveler${traveler.id}` && $('.password').val() === 'travel2020'
    });
    if (foundTraveler) {
      domUpdates.showTravelerAccessPage(foundTraveler);
      return foundTraveler.id;
    } else {
      $('.username').val() === 'agency' && $('.password').val() === 'travel2020' ? domUpdates.getAgentAccess() : domUpdates.showErrorMessage();
    }
  };
}

export default User;
