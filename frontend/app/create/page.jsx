"use client";

import { useState, useRef } from "react";
import { createProblem } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CreatePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const isSubmitting = useRef(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || isSubmitting.current) return;

    isSubmitting.current = true;
    setLoading(true);

    try {
      // 🔥 use FormData for file upload
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("location", formData.location);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const result = await createProblem(data);

      if (result?.success) {
        toast.success("Problem posted successfully");

        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast.error(result?.message || "Failed to post problem");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      isSubmitting.current = false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Post a Problem</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full h-32 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post Problem"}
        </button>
      </form>
    </div>
  );
}