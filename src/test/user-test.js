const chai = require("chai");
const expect = chai.expect;
import User from '../classes/agent';

let travelersData, tripsData, destinationsData;
describe('User', () => {
   beforeEach(() => {
     travelersData = [{
       name: 'Madison',
     }]
     tripsData = [{
       trip: 'Can\'t wait!',
     }]
     destinationsData = [{
       name: 'Hawaii',
     }]
     user = new User(travelersData, tripsData, destinationsData);
   });

   it('should be a function', function() {
     expect(User).to.be.a('function');
   });

   it('should be an instance of User', function() {
     expect(user).to.be.an.instanceof(User);
   });

   it('Should have an array of travelers', () => {
     console.log('hi');
      expect(user.travelers).to.equal(travelersData);
   });

   it('Should have an array of trips', () => {
      expect(user.trips).to.equal(tripData);
   });

   it('Should have an array of destinations', () => {
      expect(user.destinations).to.equal(destinationsData);
   });

   chai.spy.on(domUpdates, 'validateUser', () => 'agency user name and pending trips');
     it('Should invoke validateAgencyUser', () => {
       expect(domUpdates.validateUser()).to.equal('agency user name and pending trips');
     });

   chai.spy.on(domUpdates, 'validateUser', () => 'user name and all trips a user has taken');
     it('Should invoke validateUser', () => {
       expect(domUpdates.validateUser()).to.equal('user name and all trips a user has taken');
   });

   it('Should find all trips taken this year', () => {
      expect(user.getTripsThisYear()).to.be.an('[]');
   });

   it('Should calculate travelers trip expenses this year', () => {
      expect(user.calculateYearlyTravelersTripExpenses()).to.be.a(number);
   });

   it('Should find all the trips this year for each destination', () => {
      expect(user.getTripInfo()).to.be.an(object);
   });

   it('Should find all travelers on a trip today', () => {
      expect(user.getDates()).to.be.a(number);
   });
});
