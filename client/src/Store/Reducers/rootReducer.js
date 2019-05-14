const initState = {
    cities: [],
    itineraries: [],
    itinerary: {},
    posts: [],
    user: {},
    citiesIsLoaded: false,
    itinerariesIsLoaded: false,
    postsIsLoaded: false,
    error: '',
    favs: []
}

export const rootReducer = (state = initState, action) => {
    if (action.type == 'ERROR')
        state= {
            ...state,
            error: action.error
        }
    if (action.type === "GET_CITIES")
       state = {
           ...state, 
            cities: action.cities
        }
    if (action.type === "GET_ITINERARIES")
        state = {
            ...state,
            itineraries: action.itineraries
        }
        if (action.type === "GET_ITINERARY")
        state = {
            ...state,
            itinerary: action.itinerary
        }
    if (action.type === "GET_POSTS")
        state = {
            ...state,
            posts: action.posts
        }
    if (action.type === "CITIES_IS_LOADED")
        state = {
            ...state, 
            citiesIsLoaded: action.citiesIsLoaded
         }
    if (action.type === "ITINERARIES_IS_LOADED")
         state = {
             ...state, 
             itinerariesIsLoaded: action.itinerariesIsLoaded
          }
    if (action.type === "POSTS_IS_LOADED")
        state = {
            ...state, 
            postsIsLoaded: action.postsIsLoaded
        }
    if (action.type === "SEND_USER_INFO")
        state = {
            ...state, 
            user: action.user
        }
    if (action.type === "GET_USER_INFO") {
        state = {
            ...state, 
            user: action.user
        }
    }
    if (action.type == 'GET_FAVS')
        state = {
            ...state,
            favs: action.favs
        }
   
    return state;
}
