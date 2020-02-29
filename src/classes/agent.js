import User from './user';

class Agent extends User {
  constructor(travelers, trips, destinations, today) {
    super(travelers, trips, destinations, today);
  };

  getPendingTripRequests() {
    let finalObj;
    let tripRequests = this.trips.filter(trip => trip.status === 'pending');
    return tripRequests.map(trip => {
      finalObj = { name: '', date: tripRequests.date, numTrav: 0, destination: '' };
      let name = this.travelers.find(traveler => trip.userID === traveler.id);
      let destination = this.destinations.find(destination => trip.destinationID === destination.id);
      finalObj.date = trip.date;
      finalObj.numTrav = trip.travelers;
      finalObj.name = name.name;
      finalObj.destination = destination.destination;
      return finalObj;
    });
  };

  // getYearlyRevenue() {
  //
  // };
}

export default Agent;
