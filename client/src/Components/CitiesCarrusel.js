import React, {Component} from "react"
import { connect } from 'react-redux';
import * as  actionCreator  from '../Store/Actions/actions';


import "../Assets/styles/citiesCarrusel.css";

import CityNode from "./CityNode"

class CitiesCarrusel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
        }
    }

    
    componentDidMount() {
        this.props.fetchCitiesData()
    }
        
    componentWillUpdate() {
        clearInterval(this.interval)
    }

    componentDidUpdate() {
        this.interval = setInterval(() => this.incresCounter(), 5000)
    }

    render() {
        if (this.props.citiesIsLoaded)
            return (
                <div className="cities-carrusel-div">
                    {this.props.cities.map((city, index) => <CityNode src={city.src.basic} key={index} name={city.name} index={index} current={this.state.counter} />)}
                </div>
            )
        return(
            <div>
                I hate my life
            </div>
        )
    }

    incresCounter() {
        let index =  this.state.counter;
        if (index === this.props.cities.length - 1)
            index = -1;
        index++
        this.setState({counter: index})
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

export default connect(mapStateToProps,mapDispatchToProps)(CitiesCarrusel)