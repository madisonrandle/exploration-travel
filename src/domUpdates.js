import $ from 'jquery';
import Traveler from './classes/traveler';
import Agent from './classes/agent';
import moment from 'moment';

let foundTraveler, traveler, agent, today;

// ^ be sure you're using the 'today' variable and property before submitting project

const domUpdates = {
  showLogInForm: (user) => {
    foundTraveler = user;
    $('.content').html(`
      <p class="travel-quote">Wanderlust. A strong desire to wander and explore the world.</p>
      <h1 class="title">Exploration Travel</h1>
      <hr class="line">
    `);
    $('.form-container').append(`
      <form>
        <section class="travel-image-container">
          <img class="travel-image" src="../images/travel-background.jpg" alt="">
        </section>
        <section class="login-container">
          <h3 class="login-title">Sign In</h3>
          <label></label>
          <input class='username' type='text'onfocus="this.value=''" value='username'></input>
          <label></label>
          <input class='password' onfocus="this.value='', this.type='password'" value='password'></input>
          <button class='submit-user-info'>Submit</button>
          <span class='invalid-login-message'><span class="placeholder">Placeholder</span></span>
        </section>
      </form>
    `);
    $('.submit-user-info').click((e) => user.validateUser(e));
  },

  getAgentAccess: (travelers, trips, destinations, today) => {
    agent = new Agent(travelers, trips, destinations, today);
    let yearlyRevenue = agent.calculateYearlyRevenue().toLocaleString("en-US", {style: "currency", currency: "USD"});
    $('.content').html(`
      <section class="agent-access">
        <h1></h1>
        <h2>Pending Trip Requests:</h2>
        <ul class='list'></ul>
        <p>Revenue this Year: ${yearlyRevenue}</p>
      </section>
    `)
    // TAKE <br> OUT WHEN STYLING'
    console.log(foundTraveler.getDates());
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
    $('.form-container').html('');
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
    $('.invalid-login-message').text('Invalid Username or Password');
  },
}

export default domUpdates;
