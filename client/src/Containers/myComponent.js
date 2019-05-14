import React, {Component} from "react";
import { connect } from 'react-redux';
import * as  actionCreator  from '../Store/Actions/actions';




class Fetch extends Component {
    render() {
        if (this.props.dogsIsLoaded)
        return (
            <div>
                Hello World
                {console.log(this.props)}
            </div>
        )
        else
        return (
            <div>Loading</div>
        )
    }

    componentDidMount() {
        this.props.getDogs()
        this.props.getCities()
    }

}


const mapStateToProps = (state) => {
    return {
        cities: state.cities,
        dogs: state.dogs,
        dogsIsLoaded: state.dogsIsLoaded,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCities: () => dispatch(actionCreator.fetchCitiesData()),
        getDogs: () => dispatch(actionCreator.fetchDogsData())
    };
}




export default connect(mapStateToProps,mapDispatchToProps)(Fetch);