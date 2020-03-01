import $ from 'jquery';
import domUpdates from '../domUpdates';

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
      return $('.username').val() === `traveler${traveler.id}` && $('.password').val() === 'travel2020';
    });
    if (foundTraveler) {
      domUpdates.getTravelerAccess(this.travelers, this.trips, this.destinations, foundTraveler);
      return foundTraveler.id;
    } else {
      $('.username').val() === 'agency' && $('.password').val() === 'travel2020' ? domUpdates.getAgentAccess(this.travelers, this.trips, this.destinations, this.today) : domUpdates.showErrorMessage();
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
};

export default User;
