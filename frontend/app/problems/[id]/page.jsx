"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getProblemById,
  joinProblem,
  updateProblemStatus,
  addProblemUpdate,
} from "../../../lib/api.js";
import Timeline from "@/components/Timeline.jsx";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader.jsx";

export default function ProblemDetailsPage() {
  const params = useParams();
  const id = params?.id;

  const [problem, setProblem] = useState(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [updateText, setUpdateText] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch problem
  const fetchProblem = async () => {
    try {
      setLoading(true);
      const data = await getProblemById(id);

      setProblem(data.problem);
      setStatus(data.problem.status);
    } catch (error) {
      console.error("Error fetching problem:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProblem();
  }, [id]);

  // ✅ Join problem
  const handleJoin = async () => {
    if (!name.trim()) {
      toast.warning("Please enter your name");
      return;
    }

    try {
      await joinProblem(id, name);
      setName("");
      toast.success("Joined successfully");
      fetchProblem();
    } catch (error) {
      toast.error("Failed to join");
    }
  };

  // ✅ Update status
  const handleStatusUpdate = async () => {
    try {
      await updateProblemStatus(id, status);
      toast.success("Status updated");
      fetchProblem();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // ✅ Add update
  const handleAddUpdate = async () => {
    if (!updateText.trim()) {
      toast.warning("Please enter an update");
      return;
    }

    try {
      await addProblemUpdate(id, updateText);
      setUpdateText("");
      toast.success("Update added");
      fetchProblem();
    } catch (error) {
      toast.error("Failed to add update");
    }
  };

  // 🔴 FIXED LOADER (correct position)
  if (loading) {
    return <Loader />;
  }

  // Safety check
  if (!problem) {
    return <p className="text-red-500 text-center">Problem not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900">
          {problem.title}
        </h1>

        {/* Description */}
        <p className="mt-4 text-slate-700">{problem.description}</p>

        {/* Location */}
        {problem.location && (
          <p className="mt-3 text-slate-600">
            <span className="font-semibold">Location:</span>{" "}
            {problem.location}
          </p>
        )}

        {/* Status */}
        <div className="mt-4">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 capitalize">
            {problem.status}
          </span>
        </div>

        {/* Members */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Members Joined</h3>

          {problem.members?.length === 0 ? (
            <p className="text-slate-500">No members yet.</p>
          ) : (
            <ul className="list-disc pl-5 text-slate-700 space-y-1">
              {problem.members?.map((member, index) => (
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

        {/* Status Update */}
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

        {/* Add Update */}
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

        {/* Timeline */}
        <Timeline updates={problem.updates || []} />
      </div>
    </div>
  );
}