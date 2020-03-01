import $ from 'jquery';
import domUpdates from '../domUpdates';
import moment from 'moment';

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

  getDates() {
    // let dates = [];
    return this.getTripsThisYear().forEach(trip => {
      // console.log(trip);

      // startdate = "20.03.2014";
      // var new_date =
      //
      // alert(new_date);

      // let today = new Date();
      // console.log('today', today);
      // let dd = String(today.getDate()).padStart(2, '0');
      //
      // let mm = String(today.getMonth() + 1).padStart(2, '0');
      //
      // let yyyy = today.getFullYear();

      // today = yyyy + '/' + dd + '/' + mm;
      let start = moment(new Date(trip.date))
      let end = moment(start).add(trip.duration, 'days').toDate()
      console.log('start: ', start, 'end: ', end, 'today: ', today);
      // let today = new Date()
      let result = moment(today).isBetween(end, start, 'days')
      console.log(result);
    });
    };
  };

//
// let today = new Date();
// let dd = String(today.getDate()).padStart(2, '0');
// let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// let yyyy = today.getFullYear();
// today = yyyy + '/' + dd + '/' + mm;
//
// let end = 'endDate yyyy/dd/mm'
// let start = 'startDate yyyy/dd/mm'
// let result = moment(today).isBetween(end, start, 'days')


//   getDates(startDate, endDate) {
//     let dates = [];
//     let currentDate = startDate;
//     let addDays = (days) => {
//       let date = new Date(this.valueOf());
//       date.setDate(date.getDate() + days);
//       return date;
//     };
//     while (currentDate <= endDate) {
//       dates.push(currentDate);
//       currentDate = allDays.call(currentDate, 1);
//     }
//     return dates;
//   };
//
// //call getDates method
// let dates = getDates(new Date(`${'traveler start date'}`), new Date(`${'traveler end date'}`));
// // let dates = getDates(new Date(2013,10,22), new Date(2013,11,25));
// dates.forEach(function(date) {
//   console.log(date);
// });

export default User;
