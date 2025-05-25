import React from 'react'
import { motion } from 'framer-motion'

interface FlipTextProps {
  text: string
  className?: string
  animateBy?: 'words' | 'letters'
  duration?: number
  stagger?: number
}

const FlipText: React.FC<FlipTextProps> = ({
  text = 'Hover On',
  className,
  animateBy = 'letters',
  duration = 0.25,
  stagger = 0.025
}) => {
  const isLetters = animateBy === 'letters'
  const units = isLetters ? text.split('') : [text]

  return (
    <motion.p
      initial='initial'
      whileHover='hovered'
      className={`flipText ${className} overflow-hidden relative block`}
    >
      <span className='inline-block'>
        {units.map((unit, idx) => (
          <motion.span
            key={`top-${idx}`}
            variants={{
              initial: { y: 0 },
              hovered: { y: '-100%' }
            }}
            transition={{
              duration,
              delay: isLetters ? idx * stagger : 0,
              ease: 'easeInOut'
            }}
            className='inline-block'
          >
            {unit === ' ' ? (
              <span className='inline-block'>{'\u00A0'}</span>
            ) : (
              unit
            )}
          </motion.span>
        ))}
      </span>

      <span className='absolute inset-0'>
        {units.map((unit, idx) => (
          <motion.span
            key={`bottom-${idx}`}
            variants={{
              initial: { y: '100%' },
              hovered: { y: 0 }
            }}
            transition={{
              duration,
              delay: isLetters ? idx * stagger : 0,
              ease: 'easeInOut'
            }}
            className='inline-block'
          >
            {unit === ' ' ? (
              <span className='inline-block'>{'\u00A0'}</span>
            ) : (
              unit
            )}
          </motion.span>
        ))}
      </span>
    </motion.p>
  )
}

export default FlipText
