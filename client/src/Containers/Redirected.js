import React, { Component } from "react"
import { connect } from 'react-redux';
import * as  actionCreator  from '../Store/Actions/actions';
import Menu from '../Components/MenuComponent'
import { 
    GoogleLoginButton, 
    FacebookLoginButton, 
    TwitterLoginButton, 
    InstagramLoginButton,
    GithubLoginButton,
    AmazonLoginButton,
 } from "react-social-login-buttons";

import '../Assets/styles/Redirect.css'

let userCreateObj = {
    email: 'telekeke@gmilio.com',
    firstName: 'Pol',
    lastName: 'The Humble',
    password: 'topotamadre'
}

class Redirect extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user: {
                image: "",
                email: "",
                password: "",
                firstName: "",
                lastName: ""
            },
            method: 'login'
        }
    }

    componentDidMount() {
        let code =  window.location.search.split("?")[1];
        if (code) this.props.postRedirect(code)
            
    }

    render() {
        return (
            <div className="redirect-div">
                <div className="header">
                    <Menu  />
                </div>
                <div className="section">
                    <div className='select-method'>
                        <button 
                            className={"method-button " + (this.state.method == 'login' ? 'show' : 'hidde')}
                            onClick={() => this.setState({
                                method: 'login'
                            })}
                        >Log In</button>
                        <button 
                            className={"method-button " + (this.state.method == 'signup' ? 'show' : 'hidde')}
                            onClick={() => this.setState({
                                method: 'signup'
                            })}
                        >Sign Up</button>
                    </div>
                    <div className="form">
                        {this.renderLogInSignUp()}
                    </div>
                    <div className='extra-options'>
                        <GoogleLoginButton onClick={ () => window.location.replace('http://localhost:8080/api/user/auth/google/login')}>Login</GoogleLoginButton>
                        <FacebookLoginButton>Login</FacebookLoginButton>
                        {/* <TwitterLoginButton>Login</TwitterLoginButton>
                        <InstagramLoginButton>Login</InstagramLoginButton>
                        <GithubLoginButton>Login</GithubLoginButton>
                        <AmazonLoginButton>Login</AmazonLoginButton> */}
                    </div>
                </div>
                <div className="footer">
                    <a href="/web/home"><i className="fa fa-home"></i></a>
                </div>
            </div>
        )
    }

    renderLogInSignUp() {
        if (this.state.method == 'signup')
        return (
            <React.Fragment>
                <div className='error-message'>{this.props.error}</div>
                <div className='inputs-div'> 
                    <input id="firstName-input"placeholder="first name" value={this.state.firstName} onChange={ev => this.updateImputValue(ev)}></input>
                    <input id="lastName-input"placeholder="last name" value={this.state.lastName} onChange={ev =>this.updateImputValue(ev)}></input>
                    <input id="email-input" placeholder="email" value={this.state.email} onChange={ev => this.updateImputValue(ev)}></input>
                    <input id="password-input"placeholder="password" value={this.state.password} onChange={ev => this.updateImputValue(ev)}></input>
                </div>
                <button onClick={ () => this.props.fetchCreateUser(this.state.user)}>Sign Up</button>
            </React.Fragment>
        )
        return (
            <React.Fragment>
                <div className='error-message'>{this.props.error}</div>
                <div className='inputs-div'> 
                    <input id="email-input" placeholder="email" value={this.state.email} onChange={ev => this.updateImputValue(ev)}></input>
                    <input id="password-input"placeholder="password" value={this.state.password} onChange={ev => this.updateImputValue(ev)}></input>
                </div>
                <button onClick={ () => this.localLogIn()}>Log In</button>
            </React.Fragment>
        )

    }

    async localLogIn() {
        await this.props.getUserInfo(this.state.user)
        await this.props.getLoggedUser()
    }

    updateImputValue(ev) {
        let value = ev.target.value;
        if (ev.target.id == "email-input")
        this.setState({
            email: value
        })
        if (ev.target.id == "password-input")
        this.setState({
            password: value
        })
        if (ev.target.id == "firstName-input")
        this.setState({
            firstName: value
        })
        if (ev.target.id == "lastName-input")
        this.setState({
            lastName: value
        })
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
        postRedirect: (code) => dispatch(actionCreator.postRedirect(code)),
        getUserInfo: (body) => dispatch(actionCreator.fetchUserInfo(body)),
        getLoggedUser: () => dispatch(actionCreator.getLoggedUser()),
        fetchCreateUser: (body) => dispatch(actionCreator.fetchCreateUser(body)),
        loggout: () => dispatch(actionCreator.loggout())
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(Redirect);