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