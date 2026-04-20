'use client'

import { getAllProblems } from "@/lib/api"
import ProblemCard from "@/components/ProblemCard"

import React, {useState, useEffect} from "react";
const Homepage =  () => {
   const [problems, setProblems] = useState([]);

   useEffect(() => {
    const fetchProblems = async ()=> {
       try {
            
        const data = await getAllProblems();
        
        if(data && Array.isArray(data)){
          setProblems(data);
        }
        
       } catch (error) {
        console.error("Error fetching problems:", error);
       }
    }
    fetchProblems();
   }, []);

   console.log("Fetched problems:", problems);

  return (
    <>
    <div className="mb-8">
      
      <h1 className="text-4xl font-bold text-slate-900 ">Community Problems</h1>
      <p className="mt-2 text-slate-600">Report issues, gather support, and track real-world impact.</p>

    </div>
    {
      problems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center text-slate-500">
          No problems posted yet.
        </div>

      ): (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            problems.map((problem) => (
              <ProblemCard key={problem._id} problem={problem} />
            ))
          }

        </div>
      )
    }
    </>




  )
}
export default Homepage
