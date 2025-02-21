"use client"
import IncreasingDots from "@/app/_components/text-animations/IncreasingDots/IncreasingDots";

export default function IncreasingDotsDocs() {
  return <IncreasingDots 
  word='Hello' className='text-xl' repeat={-1} duration={0.15}
  />;
}
