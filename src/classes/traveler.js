import $ from 'jquery';
import domUpdates from '../domUpdates';
import User from './user';

let tripRequestInformation;

class Traveler extends User {
  constructor(travelers, trips, destinations, traveler, today) {
    super(travelers, trips, destinations, today)
    this.id = parseInt(traveler.id);
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.traveler = traveler;
  };

  getMyTrips() {
    return this.getTripsThisYear().filter(trip => trip.userID === this.id);
  };

  getMyTripDestinations() {
    return this.destinations.filter(destination => {
      return this.getMyTrips().find(trip => destination.id === trip.destinationID);
    });
  };

  // should get the last year from todays date BUT!! ... It's a leap year -_-
  calculateYearlyTripExpenses() {
    let totalTripExpense = this.getMyTripDestinations().map(destination => {
      let trip = this.getMyTrips().find(trip => destination.id === trip.destinationID);
      let flightCost = trip.travelers * destination.estimatedFlightCostPerPerson;
      let lodgingCostPerPerson = trip.duration * destination.estimatedLodgingCostPerDay;
      let lodgingCost = trip.travelers * lodgingCostPerPerson;
      let agencyFee = (flightCost + lodgingCost) * .10;
      return flightCost + lodgingCost + agencyFee;
    });
    return totalTripExpense.reduce((totalYearlyTripCost, tripCost) => totalYearlyTripCost += tripCost);
  };

  calculateTripCost(tripRequestInformation) {
    let destination = this.destinations.find(destination => destination.destination === tripRequestInformation.destination);
    let flightCost = tripRequestInformation.numTravelers * destination.estimatedFlightCostPerPerson;
    let lodgingCostPerPerson = tripRequestInformation.duration * destination.estimatedLodgingCostPerDay;
    let lodgingCost = tripRequestInformation.numTravelers * lodgingCostPerPerson;
    let agencyFee = (flightCost + lodgingCost) * .10;
    let estimatedTotal = flightCost + lodgingCost + agencyFee;
    domUpdates.showEstimatedTotal(estimatedTotal, destination, agencyFee, tripRequestInformation);
  };

  getDestinationOptions() {
    return this.destinations.map(destination => {
      return destination.destination;
    });
  };

  calculateEstimatedCostOfTrip(e) {
    let date = $('.date').val();
    let duration = $('.duration-input').val();
    let numTravelers = $('.num-travelers-input').val();
    let destination = $('.destination').val();

    if (!destination || !numTravelers || !duration || !date) {
      // console.log('not enough info!');
    } else {
      tripRequestInformation = {
        date: `${date}`,
        duration: `${duration}`,
        numTravelers: `${numTravelers}`,
        destination: `${destination}`
      }
      this.calculateTripCost(tripRequestInformation);
    }
  };

  submitTripRequest(e) {
    // console.log('trip request method');
    // console.log(this.traveler);
    // domUpdates.postTripRequest(e);
    this.validateUser(e);


  }

}

export default Traveler;
