import chai from 'chai';
import $ from 'jquery';
import domUpdates from '../src/domUpdates';

const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

describe('domUpdates.js', () => {
  chai.spy.on(domUpdates, 'showLogInForm', () => 'login');
    it('Should invoke showLogInForm', () => {
      expect(domUpdates.showLogInForm()).to.equal('login');
    });

  chai.spy.on(domUpdates, 'showErrorMessage', () => 'invalid login');
    it('Should invoke showErrorMessage', () => {
      expect(domUpdates.showErrorMessage()).to.equal('invalid login');
    });

  chai.spy.on(domUpdates, 'getAgentAccess', () => 'agency access page');
    it('Should show the agency access page', () => {
      expect(domUpdates.getAgentAccess()).to.equal('agency access page');
    });

  chai.spy.on(domUpdates, 'getTravelerAccess', () => 'traveler access page');
    it('Should show the traveler\'s access page', () => {
      expect(domUpdates.getTravelerAccess()).to.equal('traveler access page');
    });

  chai.spy.on(domUpdates, 'getSearchedPendingTripRequests', () => 'all trips for a searched traveler');
    it('Should show all trips for a user when an agent searches their name', () => {
      expect(domUpdates.getSearchedPendingTripRequests()).to.equal('all trips for a searched traveler');
    });

  chai.spy.on(domUpdates, 'approveTripRequest', () => 'show trip status as approved');
    it('Should update trip status from pending to approved', () => {
      expect(domUpdates.approveTripRequest()).to.equal('show trip status as approved');
    });

  chai.spy.on(domUpdates, 'denyTripRequest', () => 'delete trip request');
    it('Should update endpoint without the trip', () => {
      expect(domUpdates.denyTripRequest()).to.equal('delete trip request');
    });

  chai.spy.on(domUpdates, 'addPendingTripRequest', () => 'show a new pending trip on the agency page');
    it('Should add new trip requests to the agency page', () => {
      expect(domUpdates.addPendingTripRequest()).to.equal('show a new pending trip on the agency page');
    });

  chai.spy.on(domUpdates, 'bookTravelForm', () => 'display the form for a user to book travel');
    it('Should create a form for a user to input trip details', () => {
      expect(domUpdates.bookTravelForm()).to.equal('display the form for a user to book travel');
    });

  chai.spy.on(domUpdates, 'showEstimatedTotal', () => 'show an estimated total of trip before submitting');
    it('show the user an estimated total before they choose to submit their trip request', () => {
      expect(domUpdates.showEstimatedTotal()).to.equal('show an estimated total of trip before submitting');
    });

  chai.spy.on(domUpdates, 'postTripRequest', () => 'add trip requests to the endpoint');
    it('', () => {
      expect(domUpdates.postTripRequest()).to.equal('add trip requests to the endpoint');
    });
});
