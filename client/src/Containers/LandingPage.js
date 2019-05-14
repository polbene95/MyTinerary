import React, { Component } from 'react';
import '../Assets/styles/LandingPage.css';


import Menu from "../Components/MenuComponent";
import CitiesCarrusel from "../Components/CitiesCarrusel"

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    }
  }
  render() {
      return (
        <div className="landingpage-div">
            <div className="header">
                <Menu  />
            </div>
            <div className="baner-image"></div>
            <div className="section">
              <p>Let's start ...</p>
              <a href="/web/cities"><div className="arrow-image"></div></a>
            </div>
            <div className="footer">
              <CitiesCarrusel />
            </div>
        </div>
      )
  }
}
export default LandingPage;


