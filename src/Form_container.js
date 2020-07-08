import React, {Component} from 'react'
import * as countries from './countries.json'
import * as cities from './cities.json'
import {Button} from 'react-bootstrap'
import './component/styles/Form.css'

class Form_container extends Component {

  constructor(){
    super();
    this.state = {
        countries: countries.default,
        cities:cities.default,
        countryselected:'',        
        citiesSelected:[],
        citySelected:'',
        weather:[],
        temp:''
     }
  }

/**
 * To Select list of countries from json
 */
 handleCountry = event => {
    this.setState({
        countryselected: event.target.value,
        citiesSelected:this.state.cities[ event.target.value]
        
    })
    console.log(event.target.value)
    console.log(this.state.citiesSelected)
    let selectedCities=this.state.citiesSelected;
    selectedCities.map((city)=>{console.log(city)})

}

/**
 * To Select list of cities from json as per selected country
 */
handleCity = event=>{
    this.state.citySelected=event.target.value;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&APPID=52261c83c6e8a4c8e14e163120944701`)
    .then(res=>res.json()).then(data=>this.setState({temp:Math.round(data.main.temp-273.15)}))
  
}


render() {
    let countries = this.state.countries;
    let optionCountryList = countries.map((country) =>
    <option key={country.name}>{country.name}</option>);

    let cities=this.state.citiesSelected;
    let optionCityList = cities.map((city) =>
    <option key={city}>{city}</option>);

    let weather  = this.state.weather;
    let optionweather = weather.map((temp) => 
    <option key={temp}>{temp}</option>);

    return (
        <div className="main-container ">
          <div className="container">
            <form >

              <div className="form-row">

                <div className="form-group col-md-4">
                  <label for="inputState">Country</label>
                  <select id="inputState" className="form-control"  onChange={this.handleCountry}>
                    <option default>----select a Country-----</option>
                    {optionCountryList}
                  </select>
                </div>

                <div className="form-group col-md-4">
                  <label for="inputState">City</label>
                  <select id="inputState" className="form-control" onChange={this.handleCity}>

                    <option default>----select a City-----</option>
                    {optionCityList} 
                  </select>
                </div>
                <br></br>
                <label>Temparature : </label><h1>{this.state.temp}&nbsp;<span>&#8451;</span></h1>

              </div>
    
            </form>

          </div>
        </div>
    );
}
}

export default Form_container