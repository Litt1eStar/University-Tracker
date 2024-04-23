import mongoose from "mongoose";

const schema = mongoose.Schema({
    ref_year: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    semester: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Semester = mongoose.model("Semester", schema)
export default Semester