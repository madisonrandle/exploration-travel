import $ from 'jquery';
import domUpdates from '../domUpdates';
import moment from 'moment';

let foundTraveler, startDate;

class User {
  constructor (travelers, trips, destinations) {
    this.travelers = travelers;
    this.trips = trips;
    this.destinations = destinations;
  };

  validateUser(e) {
    e.preventDefault();
    foundTraveler = this.travelers.find(traveler => {
      return $('.username').val() === `traveler${traveler.id}` && $('.password').val() === 'travel2020';
    });
    if (foundTraveler) {
      domUpdates.getTravelerAccess(this.travelers, this.trips, this.destinations, foundTraveler);
      return foundTraveler.id;
    } else {
      $('.username').val() === 'agency' && $('.password').val() === 'travel2020' ? domUpdates.getAgentAccess(this.travelers, this.trips, this.destinations) : domUpdates.showErrorMessage();
    }
  };

  getTripsThisYear() {
    return this.trips.filter(trip => trip.date.includes('2020/'));
  };

  calculateYearlyTravelersTripExpenses() {
    let newProp;
    return this.getTripInfo().reduce((acc, tripObj) => {
      tripObj['totalExpenses'] = 0;
      tripObj.trips.forEach(trip => {
        let flightCost = trip.travelers * tripObj.destination.estimatedFlightCostPerPerson;
        let lodgingCost = trip.duration * tripObj.destination.estimatedLodgingCostPerDay;
        newProp = flightCost + lodgingCost;
      });
      tripObj.totalExpenses += newProp;
      acc.push(tripObj)
      return acc;
    }, []);
  };

  getTripInfo() {
    return this.destinations.map(destination => {
      let finalObj = { destination: destination, trips: ''}
      let trip = this.getTripsThisYear().filter(trip => destination.id === trip.destinationID);
      finalObj.trips = trip;
      return finalObj;
    });
  };

  getDates() {
    let currentTrips = this.getTripsThisYear().filter(trip => {
      let today = new Date();
      let start = new Date(trip.date).toDateString();
      let end = moment(start).add(trip.duration, 'days').toDate().toDateString();
      let m = moment(today, 'YYYY-DD-MM').format('l');
      let result = moment(today).isBetween(start, end);
      return result;
      });
    return currentTrips.reduce((numTravelers, trip) => {
      typeof(trip.travelers) === 'string' ? numTravelers += parseInt(trip.travelers) : numTravelers += trip.travelers;
      return numTravelers;
    }, 0);
  };
};

export default User;
