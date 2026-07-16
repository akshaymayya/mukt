import React from 'react';
import Link from 'next/link';

export default function NotFoundRoute() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6 font-sans">
      <h1 className="text-8xl md:text-9xl font-serif italic text-primary mb-6">404</h1>
      <h2 className="text-3xl md:text-4xl font-medium text-[#E1E0CC] mb-4 tracking-tight">Page not found</h2>
      <p className="text-gray-400 text-sm md:text-base max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        href="/"
        className="bg-primary text-black font-medium py-3 px-8 rounded-full hover:bg-white transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
