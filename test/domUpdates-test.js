import chai from 'chai';
import $ from 'jquery';
import domUpdates from '../src/domUpdates';

const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

describe('domUpdates.js', () => {
  // The chai spy.on method takes in 3 arguments:
      // ([object which has the method im spying on], [method's name], [callBack of what im expecting to make sure its returning what i want])

  chai.spy.on(domUpdates, 'showLogInForm', () => 'login');
    it('Should invoke showLogInForm', () => {
      expect(domUpdates.showLogInForm()).to.equal('login');
    });

  chai.spy.on(domUpdates, 'validateAgencyUser', () => 'agency user name');
    it('Should invoke validateAgencyUser', () => {
      expect(domUpdates.validateAgencyUser()).to.equal('agency user name');
    });

  chai.spy.on(domUpdates, 'validateUser', () => 'user name');
    it('Should invoke validateUser', () => {
      expect(domUpdates.validateUser()).to.equal('user name');
    });

  chai.spy.on(domUpdates, 'showErrorMessage', () => 'invalid login');
    it('Should invoke showErrorMessage', () => {
      expect(domUpdates.showErrorMessage()).to.equal('invalid login');
    });
});
