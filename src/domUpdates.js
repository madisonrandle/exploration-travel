import $ from 'jquery';
import Traveler from './classes/traveler';
import Agent from './classes/agent';

import moment from 'moment';

let foundTraveler;
let traveler;
let agent;
let today;

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
    console.log(agent.yuh())

    $('.content').html(`
      <h1>Agency Access</h1>
    `)
  },

  getTravelerAccess: (travelers, trips, destinations, foundTraveler) => {
    traveler = new Traveler(travelers, trips, destinations, foundTraveler);
    let travelerTrips = traveler.getMyTrips();

    let splitName = foundTraveler.name.split(' ');
    $('.content').html(`
      <h1>Welcome ${splitName[0]}!</h1>
      <h2>Your Adventures:</h2>
      <ul class='list'></ul>
      <p class='total-cost'>You've spent ${traveler.calculateyearlyTripExpenses()} on trips this year.</p>
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
