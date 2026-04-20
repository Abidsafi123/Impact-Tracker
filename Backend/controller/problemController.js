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


// join problem
export const joinProlem = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const { id } = req.params;

    const problem = await problemModel.findById(id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    // check if user already joined
    if (!problem.members.includes(name)) {
      problem.members.push(name);
      problem.updates.push({text:`${name} joined the problem`})
      await problem.save();
    }

    return res.status(200).json({
      success: true,
      message: "Joined problem successfully",
      problem,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error in joining problem",
      error: error.message,
    });
  }
};

// update problem status

export const updateProblemStatus = async (req, res) => {
  try {
    
    const { id } = req.params;
    const { status } = req.body;

    if(!['pending','in-progress','completed'].includes(status)){
      return res.status(400).json({
        success: false,
        message: "Invalid satatus value",
      });

      const problem = await problemModel.findById(id);
      if (!problem) {
        return res.status(404).json({
          success: false,
          message: "Problem not found",
        });
      }
      problem.status = status;
      problem.updates.push({ text: `Status changed to ${status}` });
      await problem.save();
      return res.status(200).json({
        success: true,
        message: "Status changed successfully",
        problem,
      });

      
    }

    
 
     

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error in joining problem",
      error: error.message,
    });
  }
};          