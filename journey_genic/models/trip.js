const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Trip Schema
const tripSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Name must be at least 2 characters'],
  },
  description: {
    type: String,
    required: true,
    minlength: [10, 'Description must be at least 10 characters'],
  },
  country: {
    type: String,
    required: true,
    minlength: [2, 'Country must be at least 2 characters'],
  },
  city: {
    type: String,
    required: true,
    minlength: [2, 'City must be at least 2 characters'],
  },
  tags: {
    type: [String],
    required: true,
    minlength: [1, 'At least one tag is required'],
  },
  facilities: {
    type: [String],
    required: true,
    minlength: [1, 'At least one facility is required'],
  },
  images: {
    type: [String],
    required: true,
    minlength: [1, 'At least one image is required'],
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the Trip model based on the schema
const Trip = mongoose.models.Trip || mongoose.model('Trip', tripSchema) ;
export default Trip;