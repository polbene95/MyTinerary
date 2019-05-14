import React, {Component} from "react";
import avatar from "../Assets/images/profile-picture.jpg";
import { connect } from 'react-redux';
import * as  actionCreator  from '../Store/Actions/actions';

class Profile extends Component {
    render() {
        return (
            <div className="profile" style={{backgroundImage: "url(" + this.setImage() + ")"}}>
                <div>
                    <p>~ {this.setUserName()} ~</p>
                </div>
            </div>
        )
    }

    setImage() {
        let output;
        if ( this.props.user) {
            if (!this.props.user.src)
                output = avatar
            else 
                output = this.props.user.src
        }
        return output;   
    }

    setUserName() {
        let output;
     
        if ( this.props.user) {
            if (!this.props.user.firstName)
                output = "Guest"
            else 
                output = this.props.user.firstName
        }
        return output;  
    }


}




export default Profile;