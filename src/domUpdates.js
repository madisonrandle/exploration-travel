import $ from 'jquery';

let foundTraveler;
let totalCost;

const domUpdates = {
  showLogInForm: () => { //
    $('.content').html(`
      <form>
        <label>USERNAME:</label>
        <input class='username' type='text'></input>
        <label>PASSWORD:</label>
        <input class='password' type='password'></input>
        <button class='submit-user-info'>Plan Adventure!</button>
      </form>
      <span class='invalidLoginMessage'></span>
    `)
  },

  // 1
  validateUser: (e, travelersData, tripsData, destinationsData) => {
    foundTraveler = travelersData.find(user => {
      return $('.username').val() === `traveler${user.id}` && $('.password').val() === 'travel2020'
    });
    if (foundTraveler) {
      domUpdates.showTravelerAccessPage(tripsData, destinationsData);
      return foundTraveler.id;
    }
    $('.username').val() === 'agency' && $('.password').val() === 'travel2020' ? domUpdates.showAgencyAccessPage(tripsData) : domUpdates.showErrorMessage();
  },

  // 2.aAccess
  showAgencyAccessPage: (tripsData) => {
    $('.content').html(`
      <h1>Welcome, Boss!</h1>
    `)
  },

  // 2.tAccess
  showTravelerAccessPage: (tripsData, destinationsData) => {
    domUpdates.getYearlyCostOfTrips(tripsData, destinationsData);
    let allTrips = domUpdates.getTravelerDesitinationsInfo(tripsData, destinationsData);
    totalCost = totalCost.toLocaleString("en-US", {style:"currency", currency:"USD"});
    $('.content').html(`
      <h1>Welcome, ${foundTraveler.name}!</h1>
      <h2>Your Adventures:</h2>
      <ul class='list'></ul>
      <p class='total-cost'>You've spent ${totalCost} on trips this year.</p>
    `)
    allTrips.map(destination => {
      $('.list').append(`<li>${destination.destination}</li>`);
    });
  },

  // 3.tAccess
  getTravelerDesitinationsInfo: (tripsData, destinationsData) => {
    return domUpdates.getAllTrips(tripsData, destinationsData).reduce((prices, travelDestination) => {
      prices.push({destination: `${travelDestination.destination}`, lodgingCost: `${travelDestination.estimatedLodgingCostPerDay}`, flightCost: `${travelDestination.estimatedFlightCostPerPerson}`})
      return prices;
    }, []);
  },

  // 4.tAccess
  getAllTrips: (tripsData, destinationsData) => {
    let destinations = destinationsData.reduce((trips, destination) => {
      tripsData.find(trip => {
        if (foundTraveler.id === trip.userID && destination.id === trip.destinationID) {
          trips.push(destination)
        }
      });
      return trips;
    }, []);
    domUpdates.getYearlyCostOfTrips(tripsData, destinationsData);
    return destinations
  },

  // 5.tAccess
  getYearlyCostOfTrips: (tripsData, destinationsData) => {
    totalCost = domUpdates.getCostInfo(tripsData, destinationsData).reduce((yearlyCost, costInfo) => {
      if (costInfo.date.includes('2020/')) {
        let tax = costInfo.cost * .10;
        yearlyCost += costInfo.cost + tax;
      }
      return yearlyCost;
    }, 0);
    return totalCost;
  },

  // 6.tAccess
  getCostInfo: (tripsData, destinationsData) => {
    return destinationsData.reduce((tripsCosts, destination) => {
      tripsData.reduce((cost, trip) => {
        if (foundTraveler.id === trip.userID && destination.id === trip.destinationID) {
          cost += trip.duration * destination.estimatedLodgingCostPerDay;
          tripsCosts.push({cost: cost, date: trip.date})
        }
        return cost;
      }, 0);
      return tripsCosts;
    }, []);
  },

  showErrorMessage: () => {
    $('.invalidLoginMessage').text('Invalid Username or Password');
  },
}

export default domUpdates;
//
