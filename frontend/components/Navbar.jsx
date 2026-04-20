import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white shadow-md p-4">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Impact Tracker
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium ">
          <Link href="/" className="text-white hover:text-slate-200">
            Home
          </Link>
          <Link href="/create" className="hover:text-blue-300 transition ">
            Post a Problem
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
