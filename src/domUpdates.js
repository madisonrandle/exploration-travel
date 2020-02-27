import $ from 'jquery';

let foundTraveler;
const domUpdates = {
  showLogInForm: () => {
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

  validateUser: (e, travelersData, tripsData, destinationsData) => {
    foundTraveler = travelersData.find(user => {
      return $('.username').val() === `traveler${user.id}` && $('.password').val() === 'travel2020'
    })

    if (foundTraveler) {
      domUpdates.showTravelerAccessPage(tripsData, destinationsData);
      return foundTraveler.id;
    } else if ($('.username').val() === 'agency' && $('.password').val() === 'travel2020') {
      domUpdates.showAgencyAccessPage(tripsData);
    } else {
      domUpdates.showErrorMessage();
    }
  },

  showAgencyAccessPage: (tripsData) => {
    $('.content').html(`
      <h1>Welcome, Boss!</h1>
    `)
  },

  showTravelerAccessPage: (tripsData, destinationsData) => {
    $('.content').html(`
      <h1>Welcome, ${foundTraveler.name}!</h1>
    `)
    domUpdates.getAllTrips(tripsData, destinationsData);
  },

  getAllTrips: (tripsData, destinationsData) => {
    return destinationsData.reduce((destinations, destination) => {
      tripsData.forEach(trip => {
        if (foundTraveler.id === trip.userID && destination.id === trip.destinationID) {
          destinations.push(destination)
        }
      });
      return destinations;
    }, []);
  },

  showErrorMessage: () => {
    $('.invalidLoginMessage').text('Invalid Username or Password');
  },
}


export default domUpdates;
//
