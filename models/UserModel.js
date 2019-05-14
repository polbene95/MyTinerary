const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    loginForm: {
        type: String,
        default: "Local"
    },
    password: {
        type: String,
        default: ""
    },
    isLogged: {
        type: Boolean,
        default: false,
    },
    favs: {
        type: Array,
        default: []
    },
    src: {
        type: String,
        default: "",
    },
    id: {
        type: String,
        default: "",
    }
})

module.exports = mongoose.model("User", UserSchema)