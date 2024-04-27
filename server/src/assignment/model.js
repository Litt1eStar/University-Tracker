import mongoose from 'mongoose'

const schema = mongoose.Schema({
    ref_class: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    duedate: {
        type: String,
        required: true
    },
    score_value: {
        type: Number,
        default: 0
    }
}, { timestamps: true})


const Assignment = mongoose.model('Assignment', schema)
export default Assignment

