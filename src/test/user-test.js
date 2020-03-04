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


});
