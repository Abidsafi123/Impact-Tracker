import { getAllProblems } from "@/lib/api"
import ProblemCard from "@/components/ProblemCard"


const Homepage = async () => {
  const problems = await getAllProblems()
  return (
    <div>
   
       

    </div>


  )
}
export default Homepage
