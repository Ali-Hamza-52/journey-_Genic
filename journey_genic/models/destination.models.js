import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    country: {
        type: String,
        required: true,
        minlength: 2,
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    tags: {
        type: [String],
        required: true,
        validate: [arrayLimit, 'At least one tag is required']
    },
    facilities: {
        type: [String],
        required: true,
        validate: [arrayLimit, 'At least one facility is required']
    },
    images: {
        type: [String],
        required: true,
        validate: [arrayLimit, 'At least one image is required']
    }
},
    { timestamps: true }
);

function arrayLimit(val) {
    return val.length > 0;
}

const Destination = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);

export default Destination;
