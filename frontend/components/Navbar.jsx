import Link from "next/link";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* BRAND + LOGO */}
        <Link href="/" className="flex items-center gap-2">
          
          <Image
            src="/favicon.ico"   // 👈 your image in /public/favicon.ico
            alt="Impact Tracker Logo"
            width={28}
            height={28}
          />

          <span className="text-xl font-bold tracking-wide">
            Impact<span className="text-blue-400">Tracker</span>
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-slate-300 transition">
            Home
          </Link>

          <Link
            href="/create"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
          >
            Post a Problem
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;