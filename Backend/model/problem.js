import mongoose from "mongoose";
import { memo } from "react";
const updateSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    }
},{timestamps:true})
const problemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
      
        default:""
    },
    status:{
        type:String,
        enum:['pending','in-progress','completed'],
        default:'pending'
    },
    members:{
        type:[String],
        default:[]

    },
    updates:{
        type:[updateSchema],
        default:[]
    }
    
},{timestamps:true})

const problemModel = mongoose.model('problem',problemSchema)
export default problemModel