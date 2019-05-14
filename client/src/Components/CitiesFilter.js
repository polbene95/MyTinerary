import React, {Component} from "react";

import ".././Assets/styles/CitiesFilter.css"

import CityNode from "./CityNode";

class CitiesFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cities: this.props.cities,
        }
    }

    render() {
        return (
            <div className="cities-filter">
                <div className="filter-div">
                    <input id="filter-input" placeholder="Search ..." onChange={() => this.filterCities()}></input>
                    <div><i className="fa fa-search"></i></div>
                    
                </div>
                <div className="cities-div">
                    {this.state.cities.map((city,key) => <a key={key} href={"/web/itinerary/"+ city.id}><CityNode src={city.src.landscape} name={city.name} key={key}/></a>)}
                </div>
            </div>
        )
    }

    filterCities() {
        const value = document.getElementById("filter-input").value;
        let filteredCities = this.props.cities.filter(city => city.name.toLowerCase().includes(value.toLowerCase()))
        if (value === "" || filteredCities.length == 0)
            filteredCities = this.props.cities;
        this.setState({
            cities: filteredCities,
        })
    }

}

export default CitiesFilter;