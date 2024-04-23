import mongoose from "mongoose";

const schema = mongoose.Schema({
    username: {
        type: String,
        requied: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

const User = mongoose.model("User", schema)

export default User