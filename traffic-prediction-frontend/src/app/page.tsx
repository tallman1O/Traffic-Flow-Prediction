"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";
export default function HomePage() {
  const words = [
    {
      text: " Predict",
    },
    {
      text: "Traffic",
    },
    {
      text: "Using",
    },
    {
      text: "Machine Learning",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center min-h-svh bg-slate-950  ">
      <p className="text-gray-400 dark:text-neutral-200 text-xs sm:text-base  ">
        Based on Bangalore Traffic Dataset
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link href="/form">
          <button className="w-40 h-12 rounded-md bg-white text-black border border-black text-md font-semibold hover:text-blue-500">
            Start Predicting
          </button>
        </Link>
      </div>
    </div>
  );
}
