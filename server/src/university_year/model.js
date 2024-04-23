import mongoose from "mongoose";

const schema = mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true })

const University_Year = mongoose.model('University_Year', schema)
export default University_Year