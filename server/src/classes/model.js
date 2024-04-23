import mongoose from "mongoose";

const schema = mongoose.Schema({
    ref_semester: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    class_name: {
        type: String,
        required: true
    },
    lecturer: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Classes = mongoose.model("Classes", schema)
export default Classes