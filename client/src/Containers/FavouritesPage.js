import React, { Component } from "react"
import { connect } from 'react-redux';
import * as  actionCreator  from '../Store/Actions/actions';
import Menu from '../Components/MenuComponent';
import ItineraryNode from '../Components/ItineraryNode'

import '../Assets/styles/Favourites.css'

class Favourites extends Component {
    
    componentDidMount() {
        this.props.fetchFavs() 
    }

    render() {
        
        return (
            <div className="favourites-div">
                <div className="header">
                    <Menu  />
                </div>
                <div className="section">
                {this.renderFavs()}
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
    }

    renderFavs() {
        if (this.props.favs)
            return (
                <div className="itineraies-container">
                {this.props.favs.map((itinerary, key )=>
                        <ItineraryNode 
                            key={key} 
                            itinerary={itinerary}
                            user={this.props.user}>
                        </ItineraryNode>)}
                    </div>
            )
        else 
            return (
                <div>No Favs added</div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        error: state.error,
        favs: state.favs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLoggedUser: () => dispatch(actionCreator.getLoggedUser()),
        fetchFavs: () => dispatch(actionCreator.fetchFavs())
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(Favourites);