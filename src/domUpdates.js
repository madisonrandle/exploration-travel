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
          <input class='username' type='text' value='agency'></input>
          <label></label>
          <input class='password' type='password' value='travel2020'></input>
          <button class='submit-user-info'>Submit</button>
          <span class='invalid-login-message'><span class="placeholder">Placeholder</span></span>
        </section>
      </form>
    `);
    $('.submit-user-info').click((e) => user.validateUser(e));
  },
  // code for when you turn project in
  //<input class='password' onfocus="this.value='', this.type='password'" value='traveler2020'></input>

  getAgentAccess: (travelers, trips, destinations, today) => {
    $('.form-container').hide();
    $('#blockColorblindContent').hide();
    agent = new Agent(travelers, trips, destinations, today);
    let yearlyRevenue = agent.calculateYearlyRevenue().toLocaleString("en-US", {style: "currency", currency: "USD"});
    $('.content').html(`
      <section class="agent-access">
        <h1 class="welcome-message">Welcome, Agent Khalid</h1>
        <hr class="traveler-access-line">
        <p class="agent-subtitle">Revenue this Year: ${yearlyRevenue}</p>
        <h2 class="agent-access-page-subheader">Pending Trip Requests:</h2>

        <ul class='list'></ul>


      </section>
    `)
    // TAKE <br> OUT WHEN STYLING'
    // console.log(foundTraveler.getDates());
    agent.getPendingTripRequests().map(el => {
      $('.list').append(`
        <section class="trip-request-wrapper">
          <div class="trip-request">
            <li class="pending-trip">
              <span class="pending-name">${el.name} </span>
              <span class="pending-date">${el.date} </span>
              <span class="pending-numtrav">${el.numTrav} Travelers</span>
              <span class="pending-destination">${el.destination} </span>
              <div class="agent-buttons">
              <button class="aprove-button">Approve</button>
              <button class="delete-button">Delete</button>
              </div>
              </div>
            </li>
        </section>
        `);
    });
  },

  getTravelerAccess: (travelers, trips, destinations, foundTraveler) => {
    $('.form-container').hide();
    $('#blockColorblindContent').hide();
    traveler = new Traveler(travelers, trips, destinations, foundTraveler);
    let yearlyTripExpenses = traveler.calculateYearlyTripExpenses().toLocaleString("en-US", {style: "currency", currency: "USD"});
    let travelerTrips = traveler.getMyTripDestinations();
    let splitName = foundTraveler.name.split(' ');
    $('.content').html(`
      <section class="user-access-page">
        <section class="user-page-header">
          <h1 class="welcome-message">Welcome, ${splitName[0]}!</h1>
          <button class="book-trip">Book Travel</button>
        </section>
        <hr class="traveler-access-line">
        <h2 class="user-access-page-subheader">Where are you going, where have you been?</h2>
        <p class='total-cost'>Total Spent: ${yearlyTripExpenses}</p>
        <ul class='list'></ul>
      </section>
    `);
    travelerTrips.map(destination => {
      $('.list').append(`
        <section class="user-trip-wrapper">

            <li>${destination.destination}</li>
          </div>
          <div class="trip-image">
            <img class="destination-image" src=${destination.image}>

        </section>

        `);
    });
  },

  showErrorMessage: () => {
    $('.invalid-login-message').text('Invalid Username or Password');
  },
}

export default domUpdates;
