"use client";
import { useEffect, useState } from "react";

export default function LeftContainer() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/image2.jpg";
    img.onload = () => setIsLoading(false);
  }, []);

  return (
    <div className="relative w-full hidden md:w-1/2 md:block">
      {/* ===== Background Image ===== */}
      <div
        className={`absolute inset-0 bg-center bg-no-repeat bg-cover ${
          isLoading ? "bg-gray-200" : "bg-[url(/images/image2.jpg)]"
        }`}
      ></div>

      {/* =====Overlay with color and opacity==== */}
      <div className="absolute inset-0 bg-[#F1F4EA] opacity-80"></div>

      {/* ====Content==== */}
      <section className="h-screen">
        <p className="relative h-full text-[#1F4D36] text-4xl text-center flex justify-center items-center">
          Geomatic Connect
        </p>
      </section>
    </div>
  );
}
