// components/Hero.tsx
'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function Hero() {
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');
  const [people, setPeople] = useState('');

  return (
    <div className="relative h-screen">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/video 1.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-6 text-center">
          PLAN YOUR TRIP WITH
        </h1>
        <h2 className="text-3xl md:text-5xl text-teal-400 font-bold mb-8">
          JOURNY_GENIC
        </h2>
        <p className="text-white text-xl mb-12 text-center">
          Plan your trip with respectful of the environment!
        </p>

        {/* Search Form */}
        <div className="w-full max-w-4xl bg-white rounded-lg p-4 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full p-3 border rounded-md"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Distance (km)"
                className="w-full p-3 border rounded-md"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="Max People"
                className="w-full p-3 border rounded-md"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
              />
            </div>
            <button className="bg-teal-600 text-white p-3 rounded-md hover:bg-teal-700 flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}