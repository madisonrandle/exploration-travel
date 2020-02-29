const chai = require("chai");
const expect = chai.expect;
import Traveler from '../classes/traveler';

let traveler;

describe.only('Traveler', () => {
   beforeEach(() => {
     traveler = new Traveler();
   });

   it('Should find the total amount spent on trips this year', () => {

   });

   it('Should find 10% of the total spent on trips this year', () => {

   });
}
