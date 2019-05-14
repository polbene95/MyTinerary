
//Actions

export const getCities = (cities) => {
    return {
        type: "GET_CITIES",
        cities
    }
}

export const getItineraries = (itineraries) => {
    return {
        type: "GET_ITINERARIES",
        itineraries
    }
}

export const getItinerary = (itinerary) => {
    return {
        type: "GET_ITINERARY",
        itinerary
    }
}

export const getPosts = (posts) => {
    return {
        type: "GET_POSTS",
        posts
    }
}

export const citiesIsLoaded = (citiesIsLoaded) => {
    return {
        type: "CITIES_IS_LOADED",
        citiesIsLoaded
    }
}

export const itinerariesIsLoaded = (itinerariesIsLoaded) => {
    return {
        type: "ITINERARIES_IS_LOADED",
        itinerariesIsLoaded
    }
}

export const postsIsLoaded = (postsIsLoaded) => {
    return {
        type: "POSTS_IS_LOADED",
        postsIsLoaded
    }
}

export const getGoogleInfo = (user) => {
    return {
        type: "SEND_USER_INFO",
        user
    }
} 

export const getUserInfo = (user) => {
    return {
        type: "GET_USER_INFO",
        user
    }
}

export const createUser = (user) => {
    return {
        type: "CREATE_USER",
        user
    }
}

export const getError = (error) => {
    return {
        type: "ERROR",
        error
    }
}

export const getFavs = (favs) => {
    return {
        type: "GET_FAVS",
        favs
    }
}

//Dispatches

export const fetchCitiesData = () => {
    return (dispatch) => {
        fetch("/api/city", {
            method: "GET",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(r => r.json())
        .then(json => {
            dispatch(getCities(json))
            dispatch(citiesIsLoaded(true))
        })
        .catch(e => console.log(e))
    }
}

export const fetchOneCityData = (cityName) => {
    return (dispatch) => {
        fetch("/api/city/" + cityName, {
            method: "GET",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(r => r.json())
        .then(json => {
            dispatch(getCities(json))
            dispatch(citiesIsLoaded(true))
        })
        .catch(e => console.log(e))
    }
} 

export const fetchItinerariesData = (cityName) => {
    return (dispatch) => {
        fetch("/api/itineraries/" + cityName, {
            method: "GET",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(r => r.json())
        .then(json => {
            dispatch(getItineraries(json))
            dispatch(itinerariesIsLoaded(true))
        })
        .catch(e => console.log(e))
    }
}

export const fetchOneItinerary = (id) => {
    console.log(id)
    return(dispatch) => {
        fetch('/api/itinerary/'+ id, {
            method: "GET",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(response => response.json())
        .then(json => {
            if (json.success)
            dispatch(getItinerary(json.data))
        })
    }
}

export const fetchPostsData = (id) => {
    return (dispatch) => {
        fetch("/api/posts/" + id, {
            method: "GET",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(r => r.json())
        .then(json => {
            dispatch(getPosts(json))
            dispatch(postsIsLoaded(true))
        })
        .catch(e => console.log(e))
    }
}

export const postPostsData = (post) => {
    console.log(post)
    return (dispatch) => {
        fetch("/api/posts/add", {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'post=' + JSON.stringify(post)
        })
        .then(r => r.json())
        .then(json => {
            console.log(json)
            dispatch(fetchPostsData(post.itineraryId))
        })
        .catch(e => console.log(e))
    }
}

export const postRedirect = (code) => {
    return (dispatch) => {
        fetch("/api/user/auth/google/redirect?"+code, {
            method: "GET",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(res => res.json())
        .then(json => {
            if (json.success)
            dispatch(getLoggedUser())
            else 
            dispatch(getError(json.message))
        })
        .catch(e => console.log(e))
    }
}

export const fetchUserInfo = (body) => {
    return(dispatch) => {
        fetch("/api/user/auth/local/login", {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "email="+body.email+"&password="+body.password
        })
        .then(r => r.json())
        .then(json => {
            if (json.success)
            dispatch(getLoggedUser())
            else 
            dispatch(getError(json.message))
        })
        .catch(e => console.log(e))
    }
}

export const fetchCreateUser = (body) => {
    return(dispatch) => {
        fetch("/api/user/auth/local/signup", {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },

            body: "user=" + JSON.stringify(body)
        })
        .then(r => r.json())
        .then(json => {
            if (json.success)
            dispatch(fetchUserInfo(body))
            else 
            dispatch(getError(json.message))
        })
        .catch(e => console.log(e))
    }
}

export const loggout = () => {
    return(dispatch) => {
        fetch("/api/user/auth/local/logout", {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(r => r.json())
        .then(json => {
            console.log(json)
            if (json.success)
                dispatch(getLoggedUser())
            else 
                dispatch(getError(json.message))
        })
        .catch(e => console.log(e))
    }
}

export const getLoggedUser =  () => {
    return(dispatch) => {
        fetch("/api/user/verify", {
            method: "GET",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(r => r.json())
        .then(json => {
            dispatch(getUserInfo(json.user))
            // dispatch(getFavs(json.user.favs))
        })
        .catch(err => console.log(err))
    }
}

export const addFavs = (body) => { 
    return (dispatch) => {
        fetch("/api/user/fav/add", {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'body='+JSON.stringify(body)
        })
        .then(r => r.json())
        .then(json => {

            if (!json.success)
            dispatch(getError(json.message))
            else {
                dispatch(getLoggedUser())
                dispatch(fetchFavs())
                dispatch(fetchOneItinerary(body.itinerary))
            }
            
        })
        .catch(e => console.log(e))
    }
}

export const deleteFavs = (body) => {
    return (dispatch) => {
        fetch("/api/user/fav/delete", {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "body="+JSON.stringify(body)
        })
        .then(r => r.json())
        .then(json => {
            if (!json.success)
            dispatch(getError(json.message))
            else {
                dispatch(getLoggedUser())
                dispatch(fetchFavs())
                dispatch(fetchOneItinerary(body.itinerary))
            }
        })
        .catch(e => console.log(e))
    }
}

export const fetchFavs = () => {
    return (dispatch) => {
        fetch("/api/user/favs", {
            method: "GET",
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(r => r.json())
        .then(json => {
            if (json.success) {
            dispatch(getFavs(json.data))
            dispatch(itinerariesIsLoaded(true))
            }
        })
        .catch(e => console.log(e))
    }
}