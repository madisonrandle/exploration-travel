import $ from 'jquery';
import Traveler from './classes/traveler';
import Agent from './classes/agent';
import moment from 'moment';

let foundTraveler, traveler, agent, today;

// ^ be sure you're using the 'today' variable and property before submitting project

const domUpdates = {
  showLogInForm: (user) => {
    foundTraveler = user
    $('.content').html(`
      <form>
        <label>USERNAME:</label>
        <input class='username' type='text' value='agency'></input>
        <label>PASSWORD:</label>
        <input class='password' type='password' value='travel2020'></input>
        <button class='submit-user-info'>Plan Adventure!</button>
      </form>
      <span class='invalidLoginMessage'></span>
    `);
    $('.submit-user-info').click((e) => user.validateUser(e));
  },

  getAgentAccess: (travelers, trips, destinations, today) => {
    agent = new Agent(travelers, trips, destinations, today);
    let yearlyRevenue = agent.calculateYearlyRevenue().toLocaleString("en-US", {style: "currency", currency: "USD"});
    $('.content').html(`
      <h1></h1>
      <h2>Pending Trip Requests:</h2>
      <ul class='list'></ul>
      <p>Total Revenue this Year: ${yearlyRevenue}</p>
    `)
    // TAKE <br> OUT WHEN STYLING'
    console.log(agent.getPendingTripRequests());
    agent.getPendingTripRequests().forEach(el => {
      $('.list').append(`<li>
        Name: ${el.name} <br>
        Date: ${el.date} <br>
        Number of Travelers: ${el.numTrav} <br>
        Destination: ${el.destination}
        </li>`);
    });
  },

  getTravelerAccess: (travelers, trips, destinations, foundTraveler) => {
    traveler = new Traveler(travelers, trips, destinations, foundTraveler);
    let yearlyTripExpenses = traveler.calculateYearlyTripExpenses().toLocaleString("en-US", {style: "currency", currency: "USD"});
    let travelerTrips = traveler.getMyTripDestinations();
    let splitName = foundTraveler.name.split(' ');
    $('.content').html(`
      <h1>Welcome, ${splitName[0]}!</h1>
      <h2>Your Adventures:</h2>
      <ul class='list'></ul>
      <p class='total-cost'>You've spent ${yearlyTripExpenses} on trips this year.</p>
    `);
    travelerTrips.map(destination => {
      $('.list').append(`<li>${destination.destination}
        <img src=${destination.image}></li>`);
    });
  },

  showErrorMessage: () => {
    $('.invalidLoginMessage').text('Invalid Username or Password');
  },
}

export default domUpdates;
