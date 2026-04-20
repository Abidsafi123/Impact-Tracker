"use client";

import { useEffect, useState } from "react";
import {
  getProblemById,
  joinProblem,
  updateProblemStatus,
  addProblemUpdate,
} from "../../../lib/api.js";
import Timeline from "@/components/Timeline.jsx";

export default function ProblemDetailsPage({ params }) {
  const { id } = params;

  const [problem, setProblem] = useState(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [updateText, setUpdateText] = useState("");

  const fetchProblem = async () => {
    const data = await getProblemById(id);
    setProblem(data);
    setStatus(data.status);
  };

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const handleJoin = async () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    await joinProblem(id, name);
    setName("");
    fetchProblem();
  };

  const handleStatusUpdate = async () => {
    await updateProblemStatus(id, status);
    fetchProblem();
  };

  const handleAddUpdate = async () => {
    if (!updateText.trim()) {
      alert("Please enter an update");
      return;
    }

    await addProblemUpdate(id, updateText);
    setUpdateText("");
    fetchProblem();
  };

  if (!problem) {
    return <p className="text-slate-500">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-slate-900">{problem.title}</h1>

        <p className="mt-4 text-slate-700">{problem.description}</p>

        {problem.location && (
          <p className="mt-3 text-slate-600">
            <span className="font-semibold">Location:</span> {problem.location}
          </p>
        )}

        <div className="mt-4">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 capitalize">
            {problem.status}
          </span>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Members Joined</h3>

          {problem.members.length === 0 ? (
            <p className="text-slate-500">No members yet.</p>
          ) : (
            <ul className="list-disc pl-5 text-slate-700 space-y-1">
              {problem.members.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleJoin}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
            >
              Join Problem
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Update Status</h3>

          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <button
              onClick={handleStatusUpdate}
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-medium transition"
            >
              Save Status
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Add Progress Update</h3>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Write an update"
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
              className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddUpdate}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium transition"
            >
              Add Update
            </button>
          </div>
        </div>

        <Timeline updates={problem.updates} />
      </div>
    </div>
  );
}
