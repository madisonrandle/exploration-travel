import $ from 'jquery';
import './css/main.scss';

const getTravelersData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
  .then(response => response.json())
  .then(travelersData => console.log(travelersData.travelers))
  .catch(error => console.log(`There was an error: ${error}`));

//
