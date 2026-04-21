import { getAllProblems } from "@/lib/api";
import ProblemCard from "@/components/ProblemCard";
import Link from "next/link";

export default async function HomePage() {
  const problems = await getAllProblems();

  const totalProblems = problems.length;
  const pendingProblems = problems.filter(
    (problem) => problem.status === "pending"
  ).length;
  const inProgressProblems = problems.filter(
    (problem) => problem.status === "in-progress"
  ).length;
  const completedProblems = problems.filter(
    (problem) => problem.status === "completed"
  ).length;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-blue-800 text-white rounded-3xl p-8 md:p-12 shadow-lg">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-blue-200 font-semibold">
            Community Impact Platform
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
            Turn community problems into visible action
          </h1>
          <p className="mt-4 text-slate-200 text-lg leading-relaxed">
            Report issues, gather supporters, and track progress from start to
            finish with full transparency.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link href="/create">
              <button className="bg-white cursor-pointer text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition">
                Create Problem
              </button>
            </Link>

            <a href="#problems">
              <button className="border cursor-pointer border-white/30 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition">
                Explore Problems
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Problems</p>
          <h2 className="text-3xl font-bold mt-2 text-slate-900">
            {totalProblems}
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">Pending</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-600">
            {pendingProblems}
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">In Progress</p>
          <h2 className="text-3xl font-bold mt-2 text-blue-600">
            {inProgressProblems}
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">Completed</p>
          <h2 className="text-3xl font-bold mt-2 text-green-600">
            {completedProblems}
          </h2>
        </div>
      </section>

      {/* Problems Section */}
      <section id="problems">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Community Problems
            </h2>
            <p className="text-slate-600 mt-1">
              Here are some problems that people have submitted to the community.
            </p>
          </div>
        </div>

        {problems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
            <h3 className="text-xl font-semibold text-slate-800">
              No problems posted yet
            </h3>
            <p className="text-slate-500 mt-2">
              Be the first to create a community issue and start action.
            </p>
            <Link href="/create">
              <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition">
                Create First Problem
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem) => (
              <ProblemCard key={problem._id} problem={problem} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}