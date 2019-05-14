import React, {Component} from "react"
import { connect } from 'react-redux';
import * as  actionCreator  from '../Store/Actions/actions';
import HeartCheckbox from 'react-heart-checkbox';

import Profile from "../Components/ProfileComponent"


class ItineraryNode extends Component {
    constructor(props) {
        super(props)
        this.state ={
            body: "",
            itineraryId: this.props.itinerary._id,
            author: this.props.user,
            likes: parseFloat(this.props.itinerary.details.likes)
        }
    }

    componentDidMount() {
        this.props.fetchPostsData(this.props.itinerary._id);
    }
    
    render() {    
        if(this.props.postsIsLoaded){
            if(this.props.posts.length > 0)
                if (this.props.itinerary._id===this.props.posts[0].itineraryId)
                    this.props.itinerary.details.comments = this.props.posts;
        }
        return (
            <div className="itinerary-div">
            <div className="top-div">
                <div className="left-div">
                    <Profile user={this.props.itinerary.author}></Profile>
                </div>
                <div className="right-div">
                    <div className='title-fav'> 
                    <p className="title">{this.props.itinerary.details.title}</p>
                    {this.renderFavButton()}
                    </div>
                    <div className="details">
                        <p>Likes: {this.state.likes}</p>
                        <p>{this.props.itinerary.details.time} hours</p>
                        <p>{this.props.itinerary.details.price} $</p>
                    </div>
                    <div className="hashtags">
                        {this.props.itinerary.hashtags.map((hashtag, index) => this.createHashtagNode(hashtag, index))}
                    </div>
                </div>
            </div>
            <div className="bottom-div" >
                <div className="text" onClick={this.showContentDiv}>
                    <p>v View All v</p>
                </div>
                <div className="content">
                    <div className="activities-div">
                        <p>Activities</p>
                        <div className="activities-slider">
                            {this.props.itinerary.details.activities.map((activity,index) => this.createActivityNode(activity,index))}   
                        </div>                
                    </div>
                    <div className="comments-div">
                        <p>Comments</p>
                        <div className="comments-input">
                            {this.postForm()}
                        </div>
                        <div className="comments-posts">
                            {this.props.itinerary.details.comments.reverse().map((post, index) => this.createCommentNode(post, index))}  
                        </div>
                    </div>
                    <div className="close-div">
                        <p onClick={this.hideContentDiv}>Close</p>
                    </div>
                </div>
            </div>
        </div> 
        )
    }

    renderFavButton() {
        if (this.props.user){
            let itinerary = this.props.itinerary;
            let favs = this.props.user.favs;
            if (favs) {
                
                let button;
                if (!favs.includes(itinerary._id)) {
                    button = (
                        <div className='unlike' onClick={() => this.addFav()}>❤</div>
                    )
                    // <HeartCheckbox checked='unchecked' onClick={() => this.addFav()}>Add Fav</HeartCheckbox>
                } else {
                    button = button = (
                        <div className='like' onClick={() => this.deleteFav()}>❤</div>
                    )
                }
                return (button)
            }
        }
    }

    deleteFav() {
        this.setState({
            likes: this.state.likes - 1
        })
        this.props.deleteFavs({
            itinerary: this.props.itinerary._id,
            user: this.props.user.id
        })
    }

    addFav() {
        this.setState({
            likes: this.state.likes + 1
        })
        this.props.addFavs({
            itinerary: this.props.itinerary._id,
            user: this.props.user.id
        })
    }

    postForm() {
        if (this.props.user.firstName != 'Guest')
            return (
                <React.Fragment>
                <input 
                    onChange={(ev) => this.setState({
                        body: ev.target.value,
                        author: this.props.user
                        })}>
                </input>
                <button 
                    onClick={(ev) => {
                    this.props.postPostsData(this.state)
                    console.log(ev.target.parentNode.childNodes[0])
                    ev.target.parentNode.childNodes[0].value = '';  
                }}>Send</button>
                </React.Fragment>
            ) 
        else 
        return(
            <React.Fragment>
                <a href="/web/redirect">Please, Log in in order to write a comment</a>
            </React.Fragment>
        )
    }

    showContentDiv(ev) {
        let itineraryDiv = ev.target.parentNode.parentNode.parentNode;
        let dropdownText = ev.target.parentNode;
        let bottomDiv = ev.target.parentNode.parentNode;
        let dropdownContent = bottomDiv.childNodes[1];

        itineraryDiv.classList.add("fullDisplay");
        dropdownText.classList.add("hidded");
        dropdownContent.classList.add("shown");
    
        itineraryDiv.scrollIntoView(true)
        

    }

    hideContentDiv(ev) {

        let itineraryDiv = ev.target.parentNode.parentNode.parentNode.parentNode;
        let bottomDiv = ev.target.parentNode.parentNode.parentNode;
        let dropdownText =  bottomDiv.childNodes[0];
        let dropdownContent = bottomDiv.childNodes[1];

        itineraryDiv.classList.remove("fullDisplay");
        dropdownText.classList.remove("hidded");
        dropdownContent.classList.remove("shown");
    }

    createActivityNode(activity, index) {
        return(
            <div key={index} className={'activity ' + index}>
                <p>{activity.name}</p>
            </div>
        )
    }

    createCommentNode(post, index) {
        
        let name = ''

        if (post.author != undefined)
            name = post.author.firstName
        return(
            <div key={index} className="comment-post">
                {/* <p className="name">{name} :</p> */}
                <Profile user={post.author}></Profile>
                <p className="body">{post.body}</p>
            </div>
        )
    }

    createHashtagNode(hashtag, index) {
        return (
            <p key={index}>#{hashtag}</p>
        )
    }
}


const mapStateToProps = (state) => {
    // if (Object.keys(state.itinerary).length != 0)
    // return {
    //     posts: state.posts.data,
    //     postsIsLoaded: state.postsIsLoaded,
    //     user: state.user,
    //     itinerary: state.itinerary
    // }
    // else 
    return {
        posts: state.posts.data,
        postsIsLoaded: state.postsIsLoaded,
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPostsData: (id) => dispatch(actionCreator.fetchPostsData(id)),
        postPostsData: (body) => dispatch(actionCreator.postPostsData(body)),
        addFavs: (body) => dispatch(actionCreator.addFavs(body)),
        deleteFavs: (body) => dispatch(actionCreator.deleteFavs(body))

    };
}


export default connect(mapStateToProps,mapDispatchToProps)(ItineraryNode)