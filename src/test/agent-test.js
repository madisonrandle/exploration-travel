const chai = require("chai");
const expect = chai.expect;
import User from './user';
import Traveler from '../classes/traveler';
import Agent from '../classes/agent';

let agent, travelers, trips, destinations;

describe('Agent', () => {
  beforeEach(() => {
    agent = new Agent(travelers, trips, destinations);
    travelersData = [{
      name: 'Madison',
    }]
    tripsData = [{
      trip: 'Can\'t wait!',
    }]
    destinationsData = [{
      name: 'Hawaii',
    }]
  });

  it('Should have an array of travelers', () => {
    console.log('hi');
     expect(agent.travelers).to.equal(travelersData);
  });

  it('Should have an array of trips', () => {
     expect(agent.trips).to.equal(tripData);
  });

  it('Should have an array of destinations', () => {
     expect(agent.destinations).to.equal(destinationsData);
  });

  it('Should have an array of destinations', () => {
     expect(agent.getPendingTripRequests()).to.be.an('[]');
  });




}
