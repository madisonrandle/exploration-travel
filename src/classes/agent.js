import User from './user';

class Agent extends User {
  constructor(travelers, trips, destinations, today) {
    super(travelers, trips, destinations, today);

  };

  yuh() {
    console.log(this);
  }
}

export default Agent;
