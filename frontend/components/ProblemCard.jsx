import Link from "next/link";
import React from "react";

const ProblemCard = () => {
  const statusClasses = {
    pending: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-800",
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-slate-900">Problem Title</h2>

      <p className="mt-3 text-slate-600 line-clamp-3">Problem descripion</p>

      <p className="mt-3 text-sm text-slate-500">
        <span className="font-semibold">Location: </span>
        Problem Location
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusClasses["pending"] || "bg-slate-100 text-slate-700"}`}
        >
          Pending
        </span>
        <span className="text-sm text-slate-500">
          problem members length: 3
        </span>
      </div>
      <Link href={`/problems/${1}`}>
        <button className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ProblemCard;
