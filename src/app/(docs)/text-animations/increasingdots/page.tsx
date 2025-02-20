'use client'
import IncreasingDots from '@/app/_components/text-animations/increasingdots/IncreasingDots'

const IncreasingDotsPage = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-4'>Increasing Dots</h1>
      <div className='border p-4 rounded-lg border-[#2d2d2d]  h-[400px] sm:h-[500px] flex justify-center items-center'>
        <IncreasingDots word='Hello' className='text-xl' repeat={-1} duration={0.15} />
      </div>
    </div>
  )
}

export default IncreasingDotsPage
