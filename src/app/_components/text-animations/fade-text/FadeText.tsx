import React from 'react'
import { motion } from 'framer-motion'

interface FadeTextProps {
  text?: string
  direction?: 'left' | 'right'
  className?: string
  variant?: 'fadeIn' | 'fadeOut'
  animateBy?: 'words' | 'characters'
  delay?: number
  duration?: number
}

const FadeText: React.FC<FadeTextProps> = ({
  text = '',
  direction = 'right',
  className = '',
  variant = 'fadeIn',
  animateBy = 'words',
  delay = 0.05,
  duration = 0.5
}) => {
  const contentToAnimate = animateBy === 'words' ? text.split(' ') : text.split('')
  const offset = direction === 'left' ? -50 : 50

  const animationVariants = {
    fadeIn: {
      initial: { opacity: 0, x: offset },
      animate: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: i * delay,
          duration: duration,
          ease: 'easeInOut'
        }
      })
    },
    fadeOut: {
      initial: { opacity: 1, x: 0 },
      animate: (i: number) => ({
        opacity: 0,
        x: direction === 'left' ? -100 : 100,
        transition: {
          delay: i * delay,
          duration: duration,
          ease: 'easeInOut'
        }
      })
    }
  }

  return (
    <motion.div className={`fadeText ${className}`}>
      {contentToAnimate.map((item, index) => (
        <motion.span
          key={index}
          custom={index}
          initial="initial"
          animate="animate"
          variants={animationVariants[variant]}
          className={`inline-block ${animateBy === 'words' ? 'pe-2' : ''}`}
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default FadeText
