import mongoose from "mongoose";
import config from 'config'

const connect = async () => {
  const dbUri = config.get<string>("dbUri")

  try {
    console.log(dbUri);
    
    await mongoose.connect(dbUri)
    console.log("Connected to DB");
    
  } catch (error) {
    console.error("Could not connect to DB")
    console.log(error);
    
    process.exit(1)
  }
}

export default connect