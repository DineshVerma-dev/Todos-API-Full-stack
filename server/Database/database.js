import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB || "mongodb://localhost:27017";
const DB_NAME = "todosApp";

const connectDB = async () => {
  try {

    const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);

   
    console.log(`\nMongoDB connected !! DB HOST : ${connectionInstance.connection.host}`);
  } catch (error) {

    console.log("Error in connectDB: ", error);
 
  }
};

export default connectDB;