"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
function Home () {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-7xl sm:text-8xl'>Xenkit</h1>
      <button
        onClick={() => router.push('/text-animations/increasing-dots')}
        className='mb-16 sm:mb-4 text-md mt-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg border border-gray-600 shadow-md transition duration-300'
      >
        Docs
      </button>
    </div>
  )
}

export default Home
