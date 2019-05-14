const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    
    body: {
        type: String,
        default: "",
    },

    userId: {
        type: String,
        default: "",
    },

    itineraryId: {
        type: String,
        default: "",
    },

    author: {
        type: Object,
        default: null,
    },
    time: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("Comment", PostSchema)