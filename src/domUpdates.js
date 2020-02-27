import $ from 'jquery';

let userId;

const domUpdates = {

  showLogInForm: (travelersData) => {
    $('.content').html(`
      <form>
        <label>USERNAME:</label>
        <input class='username' type='text'></input>
        <label>PASSWORD:</label>
        <input class='password' type='password'></input>
        <button class='submit-user-info'>Plan Adventure!</button>
      </form>
      <span class='invalidLoginMessage'></span>
      `)
  },

  validateAgencyUser: (e) => {
    if ($('.username').val() === 'agency' && $('.password').val() === 'travel2020') {
      $('.content').html(`
        <h1>Welcome, Boss!</h1>
        `)
    }
  },

  validateUser: (e, travelersData) => {
    let foundTraveler = travelersData.find(user => {
      return $('.username').val() === `traveler${user.id}` && $('.password').val() === 'travel2020'
    })

    if (foundTraveler) {
      userId = foundTraveler.id;
      $('.content').html(`
        <h1>Welcome, ${foundTraveler.name}!</h1>
        `)
    } else {
      domUpdates.showErrorMessage();
      domUpdates.validateAgencyUser(e);
    }
  },

  showErrorMessage: () => {
    $('.invalidLoginMessage').text('Invalid Username or Password')
  }
}

export default domUpdates;
//
