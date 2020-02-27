import $ from 'jquery';

const domUpdates = {

  showLogIn: (travelersData) => {
    $('.content').html(`
      <form>
        <label>USERNAME:</label>
        <input class='username' type='text'></input>
        <label>PASSWORD:</label>
        <input class='password' type='password'></input>
      </form>
      `)
  }
}

export default domUpdates;
//
