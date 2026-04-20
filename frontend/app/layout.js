import "./globals.css";

import Navbar from "@/components/Navbar";


export const metadata = {
  title: "Impact Tracker",
  description: "Impact Tracker is a platform that helps you track your impact",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className=""
    >
      <body className="bg-slate-50 text-slate-900  min-h-screen ">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}

        </main>
      </body>
    </html>
  );
}
