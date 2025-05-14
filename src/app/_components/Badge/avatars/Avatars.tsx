'use client'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

interface AvatarsProps {
  images: string[]
  variant: 'elastic' | 'bounce' | 'raise'
}

const Avatars: React.FC<AvatarsProps> = ({ images, variant }) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div className='avatars'>
      <motion.div
        className='flex'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {images.map((currImg, idx) => {
          const isElastic = variant === 'elastic'
          const shouldStack = !isElastic || !isHovered
          return (
            <motion.div
              key={idx}
              className={`w-12 h-12 rounded-full -ml-4 first:ml-0 relative border-2 border-black shadow-md cursor-pointer`}
              whileHover={
                variant === 'bounce'
                  ? { scale: 1.2 }
                  : variant === 'raise'
                  ? { y: -8 }
                  : {}
              }
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
              style={{
                marginLeft: idx === 0 || variant === 'elastic' ? 0 : -16,
              }}
              animate={{
                marginLeft: idx === 0 ? 0 : shouldStack ? -16 : 0
              }}
            >
              <motion.img
                src={currImg}
                alt={`avatar-${idx}`}
                className='w-full h-full object-cover rounded-full'
              />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default Avatars
