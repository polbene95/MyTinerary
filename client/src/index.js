import React from 'react';
import ReactDOM from 'react-dom';
//React Router
import { BrowserRouter as Router, Route } from 'react-router-dom';
//React Redux, Thunk
import {createStore, applyMiddleware} from'redux';
import {Provider} from 'react-redux'
import {rootReducer} from './Store/Reducers/rootReducer'
import thunk from 'redux-thunk'

//Css
import './Assets/styles/index.css';

//Containers
import LandingPage from './Containers/LandingPage';
import CitiesPage from "./Containers/CitiesList";
import CityItinerary from "./Containers/CityItinerary"
import Redirect from "./Containers/Redirected";
import Favourites from "./Containers/FavouritesPage";


const store = createStore(rootReducer, applyMiddleware(thunk))

const routing = ( 
 
    <Router>
    <React.Fragment>
        <Route exact path="/" component={LandingPage} />
        <Route path="/web/home" component={LandingPage} />
        <Route path="/web/cities" component={CitiesPage} />
        <Route path="/web/itinerary/:name" component={CityItinerary}/>
        <Route path="/web/redirect" component={Redirect}/> 
        <Route path="/web/favourites" component={Favourites}/> 
        
    </React.Fragment>
    </Router>
 )



ReactDOM.render(<Provider store={store}>{routing}</Provider>, document.getElementById('root'));



