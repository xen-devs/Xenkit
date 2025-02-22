'use client'
import IncreasingDots from '@/app/_components/text-animations/increasingdots/IncreasingDots'

export default function IncreasingDotsDocs () {
  return (
    <div className='p-4'>
      <IncreasingDots
        word='Hello'
        className='text-xl'
        repeat={-1}
        duration={0.15}
      />
    </div>
  )
}
