import $ from 'jquery';



const domUpdates = {

  showLogIn: (travelersData) => {
    $('.content').html(`
      <form>
        <label>USERNAME:</label>
        <input class='username' type='text'></input>
        <label>PASSWORD:</label>
        <input class='password' type='password'></input>
        <button class='submit-user-info'>Plan Adventure!</button>
      </form>
      `)
  },

  validateUser: (e) => {
    e.preventDefault()
    if ($('.username').val() === 'agency' && $('.password').val() === 'travel2020') {
      // make landing page once user is validated as agency
    }
  }

  //username: agency
  // password: travel2020

}


export default domUpdates;
//
