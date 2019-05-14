import React,{Component} from "react";
import { connect } from 'react-redux';
import * as  actionCreator  from '../Store/Actions/actions';

import "../Assets/styles/CitiesList.css";

import Menu from "../Components/MenuComponent";
import CitiesFilter from "../Components/CitiesFilter"

class CitiesList extends Component {

    componentDidMount() {
        this.props.fetchCitiesData()
    }

    render() {
        if(this.props.citiesIsLoaded)
        return (
            <div className="citiespage-div">
                <div className="header">
                    <Menu />
                </div>
                <div className="section">
                    <CitiesFilter cities={this.props.cities} />
                </div>
                <div className="footer">
                    <a href="/web/home"><i className="fa fa-home"></i></a>
                </div>
            </div>
        )
        return(
            <div>I hate my life</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cities: state.cities.data,
        citiesIsLoaded: state.citiesIsLoaded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCitiesData: () => dispatch(actionCreator.fetchCitiesData())
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(CitiesList)