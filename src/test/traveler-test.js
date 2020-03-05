const chai = require("chai");
const expect = chai.expect;
import Traveler from '../classes/agent';
import User from '../classes/agent';

let traveler, travelers, trips, destinations, today;

describe('Traveler', () => {
  beforeEach(() => {
    traveler = new Traveler(travelers, trips, destinations, today);
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
     expect(traveler.travelers).to.equal(travelersData);
  });

  it('Should have an array of trips', () => {
     expect(traveler.trips).to.equal(tripData);
  });

  it('Should have an array of destinations', () => {
     expect(traveler.destinations).to.equal(destinationsData);
  });

  it('Should have a traveler with an id, name and type', () => {
     expect(traveler.traveler).to.equal({
         "id": 31,
         "name": "Maureene Derrell",
         "travelerType": "relaxer"
     });
  });

  it('Should get a travelers trips', () => {
     expect(traveler.getMyTrips()).to.be.an('[]');
  });

  it('Should get a travelers destinations from their trips array', () => {
     expect(traveler.getMyTripDestinations()).to.be.an('[]');
  });

  it('Should calculate a travelers trip expenses this year', () => {
     expect(traveler.getMyTripDestinations()).to.be.a(number);
  });

  it('Should calculate the trip cost before a traveler submits a trip request', () => {
     expect(traveler.calculateTripCost()).to.be.a(number);
  });

  it('Should find the name of all destinations', () => {
     expect(traveler.getDestinationOptions()).to.be.a(string);
  });

  it('Should calculate the estimated trip cost when a traveler chooses trip options', () => {
     expect(traveler.calculateEstimatedCostOfTrip()).to.be.a(number);
  });

  chai.spy.on(domUpdates, 'submitTripRequest', () => 'should take user back to their home page after submitting trip request');
    it('Should show the traveler access page', () => {
      expect(domUpdates.submitTripRequest()).to.equal('should take user back to their home page after submitting trip request');
    });

  it('Should post a trip to the trips endpoint', () => {
     expect(traveler.submitTripRequest()).to.be.an('{}');
  });
}
