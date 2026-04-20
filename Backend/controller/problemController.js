import problemModel from "../model/problem.js"
export const getProblems = async (req,res)=>{
    try {
        
        const problems = await problemModel.find().sort({createdAt:-1})
        if(!prolems){
            return res.status(404).json({
                success:false,
                message:'faile to fetch  problems by id',
                problems


            })
            return res.status(200).json({
                success:true,
                message:'get problems successfully',    
                problems
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'internal server error in get problems'
        })
        
    }
}

// get problem by id

export const getProblemById = async(req,res)=>{
    try {
        const{id} = req.params
        const problem = await problemModel.findById(id)
        if(problem){
            return res.status(200).json({
                success:true,
                message:'get problem by id successfully',
                problem
            })
            
        }
        
    } catch (error) {
        return res.status(500).json({
            success:false,  
            message:'internal server error in get problem by id'    
        })
        
    }
}

// create a problems

export const createProblem = async(req,res)=>{
    try {
        const{title,description,location,members} = req.body
        if(!title||!description){
            return res.status(400).json({
                success:false,
                message:'title and description are required'
            })
        }
        const problem = new problemModel({
            title,
            description,
            location,
            members
        })
        await problem.save()
        return res.status(200).json({
            success:true,
            message:'create problem successfully',
            problem
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"ineternal server error in create problem"
        })
        
    }
}


// join problems