import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

interface BlurTextProps {
  text?: string
  animateBy?: 'words' | 'letters'
  direction: 'top' | 'bottom'
  delay?: number
  duration?: number
  className?: string
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  animateBy = 'words',
  direction = 'bottom',
  duration = 0.5,
  delay = 0.1,
  className = 'text-2xl sm:text-4xl'
}) => {
  const [allWords, setAllWords] = React.useState<string[]>([])
  function splitByWord (text: string) {
    const allWords: string[] = text.split(' ')
    setAllWords(allWords)
  }
  function splitByLetter (text: string) {
    const allLetters: string[] = text.split('')
    setAllWords(allLetters)
  }
  useEffect(() => {
    if (animateBy === 'words') {
      splitByWord(text || '')
    } else if (animateBy === 'letters') {
      splitByLetter(text || '')
    }
  }, [animateBy, text, direction, delay])
  return (
    <div className={`blurText ${className}`}>
      {allWords.map((word, index) => (
        <motion.span
          key={`${index}-${animateBy}-${direction}-${delay}-${text}-${duration}`}
          initial={{
            filter: 'blur(10px)',
            y: direction === 'bottom' ? 50 : -50,
            opacity: 0
          }}
          animate={{ filter: 'blur(0px)', y: 0, opacity: 1 }}
          transition={{
            delay: index * delay,
            duration: duration
          }}
          style={{
            display: 'inline-block',
            marginRight: animateBy === 'words' ? '0.5rem' : '0',
          }}
        >
          {word === ' ' ? '\u00A0' : word+' '}
        </motion.span>
      ))}
    </div>
  )
}

export default BlurText
