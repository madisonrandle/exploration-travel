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

  chai.spy.on(domUpdates, 'getAgentAccess', () => 'ageny access page');
    it('Should show the agency access page', () => {
      expect(domUpdates.getAgentAccess()).to.equal('ageny access page');
    });

  chai.spy.on(domUpdates, 'getTravelerAccess', () => 'traveler access page');
    it('Should show the traveler\'s access page', () => {
      expect(domUpdates.getTravelerAccess()).to.equal('traveler access page');
    });
});
