import React from 'react'
import MenuIcon from './MenuIcon'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

function Navbar ({
  isOpen,
  toggleSidebar
}: {
  isOpen: boolean
  toggleSidebar: () => void
}) {
  const router = useRouter()
  return (
    <div className='fixed top-0 left-0 w-full bg-[#0a0a0a] text-white py-4 px-5 flex items-center justify-between'>
      <button onClick={() => router.push('/')} className='text-3xl font-bold'>
        Xenkit
      </button>
      <div className='flex items-center gap-4'>
        <motion.a
          // initial={{ opacity: 0, filter: 'blur(5px)' }}
          // animate={{ opacity: 1, filter: 'blur(0px)' }}
          // transition={{ duration: 0.25 }}
          href='https://github.com/xen-devs/Xenkit'
          className='hidden md:block  text-md bg-gray-800 text-white p-2 py-1 rounded-lg border border-gray-600 shadow-md transition duration-300'
        >
          Contribute
        </motion.a>
        <div className='md:hidden pr-2 mb-1'>
          <MenuIcon isOpen={isOpen} toggleMenu={toggleSidebar} />
        </div>
      </div>
    </div>
  )
}

export default Navbar
