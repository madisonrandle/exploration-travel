import User from './user';

let foundTraveler;

class Traveler extends User {
  constructor(user) {
    super(user)

  };

  getMyTrips() {
    console.log(foundTraveler.id);
  };
}

export default Traveler;
