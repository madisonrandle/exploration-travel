import User from './user';

class Traveler extends User {
  constructor(travelers, trips, destinations, traveler, today) {
    super(travelers, trips, destinations, today)
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
  };

  getMyTrips() {
    return this.getTripsThisYear().filter(trip => {
      return this.destinations.find(destination => destination.id === trip.destinationID && this.id === trip.userID);
    });
    // return this.destinations.reduce((trips, destination) => {
    //   this.getTripsThisYear().find(trip => (this.id === trip.userID && destination.id === trip.destinationID) && trips.push(destination));
    //   return trips;
    // }, []);
  };

  getYearlyTripExpenses() {
    let travelerTrips = this.trips.filter(trip => trip.userID === this.id);
    let tripDestinations = this.getMyTrips();
    return travelerTrips.map(trip => {
      let finalObj = { cost: 0, date: trip.date }
        tripDestinations.forEach(destination => {
          finalObj.cost += (trip.duration * destination.estimatedLodgingCostPerDay) + (trip.travelers * destination.estimatedFlightCostPerPerson)
      });
      return finalObj;
    });
  };

  // should get the last year from todays date BUT!! ... It's a leap year -_-
  calculateyearlyTripExpenses() {

    let yearlyTripExpenses = this.getYearlyTripExpenses().reduce((acc, el) => {

      if (el.date.includes('2020/')) {
        let tax = el.cost * .10;
        acc += el.cost + tax;
      }

      return acc;
    }, 0);
    yearlyTripExpenses /= 100;
    yearlyTripExpenses = yearlyTripExpenses.toLocaleString("en-US", {style:"currency", currency:"USD"});
    return yearlyTripExpenses;

  };
}

export default Traveler;
