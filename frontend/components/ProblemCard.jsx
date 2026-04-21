"use client";

import Link from "next/link";

export default function ProblemCard({ problem }) {
  const statusClasses = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  console.log(problem.image)

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-lg hover:-translate-y-1 transition duration-300">

      {/* 🔥 IMAGE (ADDED) */}
      {problem.image && (
        <img
          src={`http://localhost:5000/${problem.image}`}
          alt={problem.title}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
      )}

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold text-slate-900 line-clamp-2">
          {problem.title}
        </h3>

        <span
          className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
            statusClasses[problem.status] || "bg-slate-100 text-slate-700"
          }`}
        >
          {problem.status}
        </span>
      </div>

      <p className="text-slate-600 mt-3 line-clamp-3">
        {problem.description}
      </p>

      {problem.location && (
        <p className="mt-4 text-sm text-slate-500">
          <span className="font-semibold">Location:</span>{" "}
          {problem.location}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
        <span>{problem.members?.length || 0} people joined</span>
        <span>
          {problem.updates?.length || 0} update
          {problem.updates?.length === 1 ? "" : "s"}
        </span>
      </div>

      <Link href={`/problems/${problem._id}`}>
        <button className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition">
          View Details
        </button>
      </Link>
    </div>
  );
}