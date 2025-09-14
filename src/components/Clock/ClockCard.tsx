import React, { useEffect, useState } from "react";

const ClockCard = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4">Round Clock Card</h2>
      <div className="relative w-32 h-32 rounded-full border-4 border-blue-500 flex items-center justify-center bg-[#f0f8ff]">
        {/* Hour Hand */}
        <div
          className={`absolute w-2 h-12 bg-blue-700 origin-bottom`}
          style={{ transform: `rotate(${hours * 30 + minutes / 2}deg)` }}
        />
        {/* Minute Hand */}
        <div
          className={`absolute w-1 h-16 bg-blue-900 origin-bottom`}
          style={{ transform: `rotate(${minutes * 6}deg)` }}
        />
        {/* Second Hand */}
        <div
          className={`absolute w-0.5 h-20 bg-red-500 origin-bottom`}
          style={{ transform: `rotate(${seconds * 6}deg)` }}
        />
        {/* Center Dot */}
        <div className="absolute w-4 h-4 bg-blue-700 rounded-full" />
      </div>
    </div>
  );
}

export default ClockCard;
