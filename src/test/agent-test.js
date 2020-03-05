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

  it('should be a function', function() {
    expect(Agent).to.be.a('function');
  });

  it('should be an instance of User', function() {
    expect(agent).to.be.an.instanceof(Agent);
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

  it('Should return an object combining properties of the trips array and travelers array', () => {
     expect(agent.getPendingTripRequests()).to.be.an('{}');
  });

  it('Should calculate an agencies yearly revenue', () => {
     expect(agent.calculateYearlyRevenue()).to.be.a(number);
  });

  it('Should calculate an agency fee of 10% of a given trips expenses', () => {
    expect(agent.calculateAgencyFee()).to.be.a(number);
  });
}
