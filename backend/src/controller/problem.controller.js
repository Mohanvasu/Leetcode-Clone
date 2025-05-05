

const createProblem = async(req,res)=>{
    const {title, description, difficulty, tags, examples,constraints, testcases, codeSnippets, referenceSolution} = req.body;

    if(req.user.role !=="ADMIN"){
        return res.status(403).json({
            error : "Youre not allowed tp correct"
        });
    }
}
const getProblem = async(req,res)=>{

}
const getProblemById = async(req,res)=>{

}
const updateProblemById = async(req,res)=>{

}
const deleteProblem = async(req,res)=>{

}
const getAllProblemSolvedByUser = async(req,res)=>{

}