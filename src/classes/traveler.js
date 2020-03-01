import User from './user';

class Traveler extends User {
  constructor(travelers, trips, destinations, traveler, today) {
    super(travelers, trips, destinations, today)
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
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
      let lodgingCost = trip.duration * destination.estimatedLodgingCostPerDay;
      let agencyFee = (flightCost + lodgingCost) * .10;
      return flightCost + lodgingCost + agencyFee;
    });
    return totalTripExpense.reduce((totalYearlyTripCost, tripCost) => totalYearlyTripCost += tripCost);
  };
}

export default Traveler;
