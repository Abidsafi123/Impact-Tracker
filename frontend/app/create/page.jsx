"use client";

import { useState } from "react";
import { createProblem } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await createProblem(formData);
    setLoading(false);

    if (result?._id) {
      router.push("/");
      router.refresh();
    } else {
      alert(result.message || "Failed to create problem");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Post a Problem</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-5"
      >
        <div>
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter problem title"
            required
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the problem"
            required
            className="w-full h-32 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          {loading ? "posting..." : "Post  Problem"}
        </button>
      </form>
    </div>
  );
}