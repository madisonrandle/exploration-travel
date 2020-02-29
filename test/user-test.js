const chai = require("chai");
const expect = chai.expect;
import Traveler from '../classes/traveler';
import Agent from '../classes/agent';
import User from '../classes/user';


let agent, user, traveler, travelersData, tripsData, destinationsData;


describe.only('User', () => {
   beforeEach(() => {
     traveler = new Traveler();
     agent = new Agent();
     user = new User(travelersData, tripsData, destinationsData);
   });


}
