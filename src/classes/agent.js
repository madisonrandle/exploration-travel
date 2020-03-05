import $ from 'jquery';
import User from './user';
import domUpdates from '../domUpdates';
import moment from 'moment';

class Agent extends User {
  constructor(travelers, trips, destinations, today) {
    super(travelers, trips, destinations, today);
  };

  getPendingTripRequests() {
    let finalObj;
    let tripID;
    let tripRequests = this.trips.filter(trip => trip.status === 'pending');
    return tripRequests.map(trip => {
      finalObj = {
        id: 0,
        name: '',
        date: '',
        numTrav: 0,
        destination: ''
      }

      let name = this.travelers.find(traveler => trip.userID === traveler.id);
      let destination = this.destinations.find(destination => trip.destinationID === destination.id);
      finalObj.id = name.id;
      finalObj.date = trip.date;
      finalObj.numTrav = trip.travelers;
      finalObj.name = name.name;
      finalObj.destination = destination.destination;
      return finalObj;
    });
  };

  calculateYearlyRevenue() {
    return this.calculateAgencyFee().reduce((yearlyRevenue, destination) => {
      yearlyRevenue += destination.revenue;
      return yearlyRevenue;
    }, 0);
  };

  calculateAgencyFee() {
    return this.calculateYearlyTravelersTripExpenses().filter(expenseData => {
      return expenseData['revenue'] = expenseData.totalExpenses * .10;
    });
  };
}

export default Agent;
