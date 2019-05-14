import React, {Component} from "react";
import "../Assets/styles/menuComponent.css"

import { connect } from 'react-redux';
import * as  actionCreator  from '../Store/Actions/actions';

import Profile from "./ProfileComponent"

class Menu extends Component {

    componentDidMount() {
        this.props.getLoggedUser()
    }

    render() {
        return (
            <div className="menu dropdown">
                <i onClick={() => this.displayMenu()} id="icon" className="fa fa-bars"></i>
                <div id="menu" className="dropdown-content">
                   <Profile user={this.props.user}/>
                  {this.props.user.id != 'guest' ? this.userLoggedIn() : this.userLoggedOut()}
                </div>
           </div>
        )
    }

    displayMenu() {
        let menu = document.getElementById("menu");
        menu.classList.add("show")
    }

    hideMenu() {
        let menu = document.getElementById("menu");
        menu.classList.remove("show")
    }

    userLoggedIn() {
        return (
            <div className="options">                   
                <div>My Itineraries</div>
                <div>Profile</div>
                <div onClick={ () => window.location.replace('/web/cities')}>Cities</div>
                <div onClick={ () => window.location.replace('/web/favourites')}>Favourites</div>
                <div onClick={ async () => this.props.loggout()}>Log out</div>
                <div className="close-menu">
                    <i onClick={() => this.hideMenu()} id="icon" className="fa fa-times"></i>
                </div>
            </div>
        )
    }

    userLoggedOut() {
        return (
            <div className="options">
                <div onClick={ () => window.location.replace('/web/cities')}>Cities</div>
                <div onClick={ () => window.location.replace("/web/redirect")}>Log In</div>
                <div className="close-menu">
                    <i onClick={() => this.hideMenu()} id="icon" className="fa fa-times"></i>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLoggedUser: () => dispatch(actionCreator.getLoggedUser()),
        loggout: () => dispatch(actionCreator.loggout())
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(Menu);