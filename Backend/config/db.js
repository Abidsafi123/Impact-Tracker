import mongoose from "mongoose";
import dotenv from "dotenv";    
dotenv.config()
const connection = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        
            console.log("connecton successfull with mongodb atlas")
        
        

    } catch (error) {
        console.log("error while connection with mongodb atlas")
        process.exit(1)
        
    }
}
export default connection