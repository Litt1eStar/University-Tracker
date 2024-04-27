import mongoose from "mongoose";

const schema = mongoose.Schema({
    value: {
        type: Number,
        default: 0
    },
    maxValue: {
        type: Number,
        default: 0
    }
})

const Score = mongoose.model("Score", schema)
export default Score