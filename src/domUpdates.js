import $ from 'jquery';
import Traveler from './classes/traveler';
import Agent from './classes/agent';
import moment from 'moment';

let foundTraveler, traveler, agent, today, user;

// ^ be sure you're using the 'today' variable and property before submitting project
const domUpdates = {
  showLogInForm: (user) => {
    foundTraveler = user;

    $('.content').html(`
      <p class="travel-quote meow">Wanderlust. A strong desire to wander and explore the world.</p>
      <h1 class="title">Exploration Travel</h1>
      <hr class="line">
    `);
    $('.form-container').append(`
      <form class='login-form'>
        <section class="travel-image-container">
        <img class="travel-image" src="https://i.postimg.cc/tTcDKLbP/exploration.png"/>
        </section>
        <section class="login-container">
          <h3 class="login-title">Sign In</h3>
          <label></label>
          <input class='username' type='text' value='traveler45'></input>
          <label></label>
          <input class='password' type='password' value='travel2020'></input>
          <button class='submit-user-info'>Submit</button>
          <span class='invalid-login-message'><span class="placeholder">Placeholder</span></span>
        </section>
      </form>
    `);
    $('.submit-user-info').click((e) => user.validateUser(e));
  },

  //onfocus="this.value='', this.type='password'"

  getAgentAccess: (travelers, trips, destinations, today) => {
    $('.form-container').hide();
    $('#blockColorblindContent').hide();
    agent = new Agent(travelers, trips, destinations, today);
    let yearlyRevenue = agent.calculateYearlyRevenue().toLocaleString("en-US", {style: "currency", currency: "USD"});
    $('.content').html(`
      <section class="agent-access">
        <h1 class="welcome-message">Travel Agent: Hannah</h1>
        <hr class="traveler-access-line">
        <p class="agent-subtitle">Revenue this Year: ${yearlyRevenue}</p>
        <p class="agent-subtitle">Number of Travelers Today: ${foundTraveler.getDates()}</p>
        <h2 class="agent-access-page-subheader agent-sub">Pending Trip Requests:</h2>
        <div class="search-trips-wrapper">
          <input class="search-pending-input book-trip-inputs" value="Search Pending Requests" onfocus="this.value=''">
          <button class="search-pending">Search Traveler</button>
        <div>
        <ul class='list'></ul>
      </section>
    `);
    agent.getPendingTripRequests().map(el => {
      $('.list').append(`
        <section class="trip-request-wrapper">
          <div class="trip-request">
            <li class="pending-trip" id="${el.id}">
              <span class="pending-name">${el.name} </span>
              <span class="pending-date">${el.date} </span>
              <span class="pending-numtrav">${el.numTrav} Travelers</span>
              <span class="pending-destination">${el.destination} </span>
              <div class="agent-buttons">
              <button class="approve-button" id="${el.id}">Approve</button>
              <button class="deny-button" id="${el.id}">Deny</button>
              </div>
              </div>
            </li>
        </section>
      `);
    });
    $('.approve-button').click((e) => domUpdates.approveTripRequest(e));
    $('.deny-button').click((e) => domUpdates.denyTripRequest(e));
    $('.search-pending').click((e) => domUpdates.getSearchedPendingTripRequests(e));

  },

  getSearchedPendingTripRequests: (e) => {
    let searchInput = $('.search-pending-input').val()
    let searched = foundTraveler.travelers.filter(traveler => traveler.name.toLowerCase().includes(searchInput));
    let allTrips = foundTraveler.trips.filter(trip => {
      return trip.userID === searched[0].id;
    });

    allTrips.forEach(trip => {
      let formatedDate = moment(trip.date).format('MM/DD/YYYY');
      trip.date = formatedDate;
    })

    allTrips.filter(trip => {
      $('.agent-sub').html(`
        <h2 class="agent-access-page-subheader">Searching ${searched[0].name} Trips...</h2>
      `)
      $('.list').html(`
        <section class="trip-request-wrapper">
          <div class="trip-request">
            <li class="pending-trip" id="${searched[0].id}">
              <span class="pending-name">${searched[0].name} </span>
              <span class="pending-date">${trip.date} </span>
              <span class="pending-numtrav">${trip.travelers} Travelers</span>
              <span class="pending-destination">${trip.destinationID} </span>
              <div class="agent-buttons">
              <button class="approve-button">Approve</button>
              <button class="deny-button">Deny</button>
              </div>
              </div>
            </li>
        </section>
      `);
    });
  },

  approveTripRequest: (e) => {


    let foundTrip = foundTraveler.trips.find(trip => trip.userID === parseInt(event.target.id))

    if (foundTrip && foundTrip.status === 'pending') {
      let formatedDate = moment(foundTrip.date).format('YYYY/MM/DD');
      fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: foundTrip.id,
          status: 'approved'
        }),
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(`There was an error: ${error}`));
    }
  },

  denyTripRequest: (e) => {
    let foundTrip = foundTraveler.trips.find(trip => trip.userID === parseInt(event.target.id))

    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: foundTrip.id,
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(`There was an error: ${error}`));

  },


  getTravelerAccess: (travelers, trips, destinations, user) => {
    $('.form-container').hide();
    $('#blockColorblindContent').hide();
    traveler = new Traveler(travelers, trips, destinations, user);

    let yearlyTripExpenses = traveler.calculateYearlyTripExpenses().toLocaleString("en-US", {style: "currency", currency: "USD"});

    let travelerTrips = traveler.getMyTripDestinations();

    let splitName = user.name.split(' ');
    $('.content').html(`
      <section class="user-access-page">
        <section class="user-page-header">
          <h1 class="welcome-message">Welcome, ${splitName[0]}!</h1>
          <button class="book-trip">Book Travel</button>
        </section>
        <hr class="traveler-access-line">
        <p class='total-cost'>Total Spent: ${yearlyTripExpenses}</p>
        <ul class='list pre-existing-list'></ul>
      </section>
    `);
    travelerTrips.map(destination => {
      $('.list').append(`
        <section class="user-trip-wrapper">
            <li>${destination.destination}</li>
            <img class="destination-image" src=${destination.image}>
        </section>
        `);
    });
      $('.book-trip').click((e) => domUpdates.bookTravelForm(e));
  },

  addPendingTripRequest: (e, tripRequestInformation, destination) => {
    $('.pre-existing-list').hide();
    $('.total-cost').hide();
    $('.content').append(`
      <p>Pending Trips:</p>
      <section class="user-trip-wrapper pending-trip-requests">
        <p class="destination-title">${destination.destination}</p>
        <img class="destination-image" src=${destination.image}>
      </section>
    `);
  },

  bookTravelForm: (e) => {
    let destinationOptions = traveler.getDestinationOptions();
    $('.content').html(`
    <section class="book-travel-page">
      <h1 class="welcome-message welcome-message-book">Book Travel</h1>
      <hr class="traveler-access-line">
      <h2 class="user-access-page-subheader">Subheader</h2>
      <form class='book-travel-form main-travel-request-form'>
          <label class="book-trip-labels font">Date</label>
            <input class='book-trip-labels date' type='date'>
          <label class="book-trip-labels font">Duration</label>
            <input class='book-trip-inputs book-input duration-input' type="number" min="1" max="365">
          <label class="book-trip-labels font">Number of Travelers</label>
            <input class='book-trip-inputs book-input number-of-travelers num-travelers-input' type="number" min="1" max="100">
          <label class="book-trip-labels font">Destinations</label>
            <select class='book-trip-inputs book-input destination'>
              <option class="destination-input"></option>
            </select>
      </form>
      `);

    destinationOptions.map(destination => {
      $('.destination').append(`
        <option class="destination-input">${destination}</option>
      `);
    });
    $('.date, .destination').change((e) => traveler.calculateEstimatedCostOfTrip(e));
    $('.duration-input, .num-travelers-input').keyup((e) => traveler.calculateEstimatedCostOfTrip(e));
  },

  showEstimatedTotal: (estimatedTotal, destination, agencyFee, tripRequestInformation, e) => {
    let flightCost = destination.estimatedFlightCostPerPerson.toLocaleString("en-US", {style: "currency", currency: "USD"});
    let lodgingCost = destination.estimatedLodgingCostPerDay.toLocaleString("en-US", {style: "currency", currency: "USD"});
    let total = estimatedTotal.toLocaleString("en-US", {style: "currency", currency: "USD"});
    let agentFee = estimatedTotal.toLocaleString("en-US", {style: "currency", currency: "USD"});
    $('.content').html(`
    <section class="book-travel-page">
      <h1 class="welcome-message welcome-message-book">Book Travel</h1>
      <hr class="traveler-access-line">
      <h2 class="user-access-page-subheader back-to-booking-page home">home</h2>
      <h2 class="user-access-page-subheader back-to-booking-page">back to booking page</h2>
      <section class="book-travel-container">
      <section class='book-travel-form-container'>
        <form class='book-travel-form trip-request-info'>
            <label class="book-trip-labels font">Date</label>
              <p>${tripRequestInformation.date}</p>
            <label class="book-trip-labels font">Duration</label>
              <p>${tripRequestInformation.duration}</p>
            <label class="book-trip-labels font">Number of Travelers</label>
              <p>${tripRequestInformation.numTravelers}</p>
            <label class="book-trip-labels font">Destinations</label>
              <p>${tripRequestInformation.destination}</p>
        </form>
        <section class="estimated-totals">
          <section class="totals">
            <p class="book-trip-labels estimated-labels">Flight Cost</p>
            <p class="label-subheader">Estimated Per Traveler</p>
            <p class="estimated-flight">${flightCost}</p>
            <p class="book-trip-labels estimated-labels">Daily Lodging Cost</p>
            <p class="label-subheader">Estimated Per Traveler</p>
            <p class="estimated-lodging">${lodgingCost}</p>
            <div class="grand-total">
              <p class="book-trip-labels estimated-labels">Total Cost</p>
              <p class="estimated-total">${total}</p>
            </div>
            <p class="label-subheader">This includes a 10% booking fee of ${agentFee}</p>
          </section>
          <button class="submit-trip-button">Submit</button>
        </section>
      </section>
    </section>
  `);
    $('.home').click((e) => domUpdates.getTravelerAccess(e));
    $('.back-to-booking-page').click((e) => domUpdates.bookTravelForm(e));
    $('.submit-trip-button').click((e) => traveler.submitTripRequest(e));
  },

  postTripRequest: (tripRequestInformation, destination) => {
    let formatedDate = moment(tripRequestInformation.date).format('YYYY/MM/DD');
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips', {
      method: 'POST',
      headers: {
      	'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       id: Date.now(),
       userID: user.id,
       destinationID: parseInt(destination.id),
       travelers: parseInt(tripRequestInformation.numTravelers),
       date: formatedDate,
       duration: parseInt(tripRequestInformation.duration),
       status: "pending",
       suggestedActivities: []
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(`There was an error: ${error}`));
  },

  showErrorMessage: () => {
    $('.invalid-login-message').text('Invalid Username or Password');
  },
};

export default domUpdates;
