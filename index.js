const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const passportSetup = require("./config/passport-setup");
const keys = require("./config/keys");
const jwt = require('jsonwebtoken');


const app = express()

const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const bodyParser= require('body-parser');
var ObjectID = require('mongodb').ObjectID;

var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./client/src/Store/Scratch');


const User = require("./models/UserModel")
const Comment = require('./models/CommentModel')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


MongoClient.connect('mongodb://polbene:pol123@ds119374.mlab.com:19374/my_itinerary', (err, db) => {
    var dbase = db.db("my_itinerary");
    if (err) throw console.error(err)

    app.listen(8080, () => {
      console.log('app working on 3000')
    })
    
    //GET One City By Name
    router.get('/city/:name', (req, res) => {
        let {name} = req.params;
        dbase.collection('city').findOne({
            "id": name
        }, (err, results) => {
            if(err)
            return res.send({
                success: false,
                message: "Error: Server Error"
            })
            
            //do this now


            return res.send({
                success: true,
                data: results
            })
        });
    });

    //GET All Cities
    router.get('/city', (req, res) => {
        dbase.collection('city').find().toArray( (err, results) => {
            if(err)
            return res.send({
                success: false,
                message: "Error: Server Error"
            })
            return res.send({
                success: true,
                data: results
            })
        });
    });

    //GET City Itinerary
    router.get("/itineraries/:name", (req, res) => {
        let {name} = req.params
        dbase.collection("itinerary").find({
            ref: name
        }).toArray((err,results) => {
            if(err)
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                })
            return res.send({
                success: true,
                data: results
            });
        })
    })

    router.get("/itinerary/:id", (req, res) => {
        let {id} = req.params
        dbase.collection("itinerary").findOne({
            _id: ObjectID(id)
        }, (err,results) => {
            if(err)
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                })
            return res.send({
                success: true,
                data: results
            })
        })
    })


    //GET Itinerary Posts
    router.get("/posts/:id", (req,res) => {
        let {id} = req.params;
        dbase.collection("posts").find().toArray((err, results) => {
            let selected = results.filter(post => post.itineraryId == id)
            if(err)
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                })
            return res.send({
                success: true,
                data: selected
            });
        })
    })

    //POST Create an Itinerary Post

    router.post('/posts/add', (req,res) => {
      
        const {
            body,
            author,
            itineraryId,
        } = JSON.parse(req.body.post)

        if (!author)
        return res.send({
            success: false,
            message: "Error: No User Logged In"
        })

        const post = new Comment({
            body,
            author,
            itineraryId
        })

        dbase.collection('posts').save(post,(err,doc) => {
            if (err)
            return res.send({
                success: false,
                message: "Error: Server Error"
            })
            return res.send({
                success: true,
                message: "Comment Posted"
            })
        })
    })

    router.get("/user/favs", (req, res) => {

        const token = localStorage.getItem("user")
        if (token != "null")
        dbase.collection('users').findOne({
            '_id': ObjectID(token)
        }, async (err, user) => {
            if(err)
            return res.send({
                success: false,
                message: "Error: Server Error"
            })
            let favs = [];
            if(user.favs.length != 0) {
            user.favs.map(fav => dbase.collection("itinerary").findOne({
                    '_id': ObjectID(fav)
                }, (err,itinerary) => {
                    if(err)
                        return res.send({
                            success: false,
                            message: "Error: Server Error"
                        })
                    favs = [...favs, itinerary]
                    if (favs.length == user.favs.length)
                    return res.send({
                        success: true,
                        data: favs
                    })
                }))
            } else {
                return res.send({
                    success: true,
                    message: 'No Favs Found'
                })
            }
        })
    })

    //ADD Post To Favs

    router.post('/user/fav/add', async (req,res) => {
        const {
            user, 
            itinerary
        } = JSON.parse(req.body.body)

        dbase.collection('users').findOneAndUpdate({
            _id: ObjectID(user)
        },
        {
            $push: {
                favs: itinerary
            }
        },
        null,
        (err, result) => {
            if (err)
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                })
                dbase.collection('itinerary').findOneAndUpdate({
                    _id: ObjectID(itinerary)
                },  {
                    $inc: {
                       "details.likes" : 1
                    }
                },
                null,
                (err, result) => {
                    if(err)
                        return res.send({
                            success: false,
                            message: "Error: Server Error"
                        })
              
                return res.send({
                    success: true,
                    message: "Itinerary Added To Favourites"
                })
            })
        })
    })

    //DELETE Post From Favs

    router.post('/user/fav/delete', async (req,res) => {
        const {
            user, 
            itinerary
        } = JSON.parse(req.body.body)

        dbase.collection('users').findOneAndUpdate({
            _id: ObjectID(user)
        },
        {
            $pull: {
                favs: itinerary
            },
            
        },
        {
            safe: true
        },
        (err, result) => {
            if(err)
            return res.send({
                success: false,
                message: "Error: Server Error"
            })
            
            dbase.collection('itinerary').findOneAndUpdate({
                _id: ObjectID(itinerary)
            },  {
                $inc: {
                   "details.likes" : -1
                }
            },
            null,
            (err, result) => {
                if(err)
                    return res.send({
                        success: false,
                        message: "Error: Server Error"
                    })
                return res.send({
                    success: true,
                    message: "Itinerary Removed From Favourites"
                })
             })
        })
    })

    //GET Logged In User 
    router.get("/user/verify", (req,res) => {
        const token = localStorage.getItem("user")
        if (token != "null")
        dbase.collection("users").findOne({
            "_id": ObjectID(token)
        }, (err,result) => {
            if(err)
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                })
            return res.send({
                success: true,
                user: {
                    email: result.email,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    src: result.src,
                    favs: result.favs,
                    id: token
                }
            })
        })
        else
            return res.send({
                success: true,
                user: new User({
                    firstName: 'Guest',
                    id: 'guest'
                })
            })
    })

    //UPDATE Sign Out User

    router.post("/user/auth/local/logout", (req, res) => {
        const token = localStorage.getItem("user");
        dbase.collection("users").findOneAndUpdate({
            "_id": ObjectID(token),
            loginForm: "Local"
        }, 
        {
            $set: {
                isLogged: false,
            }
        }, 
        null,
        (err,result) => {
            if(err)
            return res.send({
                success: false,
                message: "Error: Server Error"
            })
            localStorage.setItem("user", "null")
            return res.send({
                success: true,
                message: "User Logged Out"
            })
        })
    })

    //UPDATE Sign In User

    router.post("/user/auth/local/login", (req, res) => {
        const {
            email,
            password
        } = req.body;
        dbase.collection("users").findOneAndUpdate({
            email: email.toLowerCase(),
            password: password,
            loginForm: "Local"
        }, 
        {
            $set: {
                isLogged: true,
            }
        }, 
        null,
        (err,result) => {
            if(err)
            return res.send({
                success: false,
                message: "Error: Server Error"
            })

            const user = result.value;
          
            if (user == null)
                return res.send({
                    success: false,
                    message: "Error: Email or Password are Wrong"
                })

            localStorage.setItem("user", user._id)
            
            return res.send({
                success: true,
                message: "User Logged In"
            })
        })
    })

    //POST Sign Up User

    router.post("/user/auth/local/signup", (req,res) => {

        const {
            firstName,
            lastName,
            email,
            password
        } = JSON.parse(req.body.user);

        if (!firstName)
        return res.send({
            success: false,
            message: "Error: Missing First Name",
        })
        if (!lastName)
        return res.send({
            success: false,
            message: "Error: Missing Last Name",
        })
        if (!email)
        return res.send({
            success: false,
            message: "Error: Missing Email",
        })
        if (!password)
        return res.send({
            success: false,
            message: "Error: Missing Password",
        })


        dbase.collection("users").findOne({
            email: email.toLowerCase(),
            loginForm: "Local"
        }, (err,result) => {
            if (err)
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                })
            
            if (result != null)
                return res.send({
                    success: false,
                    message: "Error: User email already exists"
                })

            //User Schema
            const newUser = new User();
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.email = email.toLowerCase();
            newUser.password = password;
            dbase.collection("users").save(newUser,
                (err,doc) => {
                if (err)
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                })
                return res.send({
                    success: true,
                    message: "User Created"
                })
            })
        })
    })

    //DELETE Delete User

    //PASPORT.js

    //Google LogIn
    router.get("/user/auth/google/login", passport.authenticate("google", {
        scope: ['profile', 'email']
    }))

    router.get("/user/auth/google/redirect", (req,res,next) => {
        return passport.authenticate("google", (req) => {  
            if(req.loginForm == "Google") {
                dbase.collection("users").findOne(
                    {
                        id: req.id,
                        loginForm: "Google"
                    }, 
                    (err, result) => {
                        if (err)
                            return "Error: Server error";
                        
                        if (!result) {
                            dbase.collection("users").save(req, (err, response) => {
                                if (err)
                                    return res.send({
                                        success: false,
                                        message: "Error: Server Error"
                                    })
                                
                                    dbase.collection("users").findOneAndUpdate({
                                        id: req.id,
                                        loginForm: "Google"
                                    }, 
                                    {
                                        $set: {
                                            isLogged: true,
                                        }
                                    },
                                    null,
                                    (err, response) =>{
                                        if (err)
                                            return res.send({
                                                success: false,
                                                message: "Error: Server Error"
                                            })
                                        localStorage.setItem("user", response.value._id)
                                        return res.send({
                                            success: true,
                                            message: "User Logged In"
                                        })
                            
                                    })
                            })
                        } else {
                            dbase.collection("users").findOneAndUpdate({
                                id: req.id,
                                loginForm: "Google"
                            }, 
                            {
                                $set: {
                                    isLogged: true,
                                }
                            },
                            null,
                            (err, response) =>{
                                if (err)
                                    return res.send({
                                        success: false,
                                        message: "Error: Server Error"
                                    })
                                localStorage.setItem("user", response.value._id)
                                return res.send({
                                    success: true,
                                    message: "User Logged In"
                                })
                    
                            })
                        }
                    }
              
                 )  
            } else {
                return res.send({
                    success: true
                })
            }
        }) (req,res,next)
    })

    app.use('/api', router);
})

