import mongoose from "mongoose";

const databaseConnection = async () => {
    try {
        // Check if the connection is already established
        // if (mongoose.connection.readyState === 1) {
        //     return;
        // }

        // Use mongoose's built-in promise library
        mongoose.Promise = global.Promise;
        // Connect to MongoDB using environment variable or default URI
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017", {
            dbName: process.env.MONGODB_Name
        });
        console.log('Connected to the MongoDB database successfully');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }

}

export default databaseConnection;