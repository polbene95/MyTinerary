import React, {Component} from "react";
import { connect } from 'react-redux';
import * as  actionCreator  from '../Store/Actions/actions';

import "../Assets/styles/CityItinerary.css"

import CityNode from "../Components/CityNode";
import Menu from "../Components/MenuComponent";
import ItineraryNode from "../Components/ItineraryNode";

const cityName = window.location.pathname.split("/")[3]

class CityItinerary extends Component {
    render() {
        if (this.props.cityIsLoaded && this.props.itinerariesIsLoaded && this.props.user)
            return (
                <div className="itineraries-div">
                <div className="header">
                    <Menu />
                </div>
                <div className="section">
                    <CityNode src={this.props.city.src.landscape} name={this.props.city.name}></CityNode>
                    <div className="itineraies-container">
                        {this.props.itineraries.map((itinerary, key )=>
                        <ItineraryNode 
                            key={key} 
                            itinerary={itinerary}
                            user={this.props.user}>
                        </ItineraryNode>)}
                    </div>
                </div>
                <div className="footer">
                    <div>
                        <a className="back-button" href="/web/cities"><i className="fa fa-arrow-left"></i></a>
                    </div>
                    <div>
                        <a className="home-button" href="/web/home"><i className="fa fa-home"></i></a>
                    </div>
                </div>
            </div>
            )
        return (
            <div>
                Oh Mama !
            </div>
        )
    }

    componentDidMount() {
        this.props.fetchCitiesData(cityName);
        this.props.fetchItinerariesData(cityName);
        this.props.getLoggedUser()
    }

}

const mapStateToProps = (state) => {
    
    return {
        city: state.cities.data,
        cityIsLoaded: state.citiesIsLoaded,
        itinerariesIsLoaded: state.itinerariesIsLoaded,
        itineraries: state.itineraries.data,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCitiesData: (cityName) => dispatch(actionCreator.fetchOneCityData(cityName)),
        fetchItinerariesData: (cityName) => dispatch(actionCreator.fetchItinerariesData(cityName)),
        getLoggedUser: () => dispatch(actionCreator.getLoggedUser()),

    };
}


export default connect(mapStateToProps,mapDispatchToProps)(CityItinerary)