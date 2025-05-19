import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface RotatingTextProps {
  constantText: string
  rotatingWords: string[]
  className?: string
  backGroundColor?: string
  textColor?: string
  rotateInterval?: number
  animationDuration?: number
}

const RotatingText: React.FC<RotatingTextProps> = ({
  constantText,
  rotatingWords,
  className = "sm:text-4xl text-xl",
  backGroundColor = '#94a3b8',
  textColor = '#000',
  rotateInterval = 900,
  animationDuration = 0.5,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [wordWidth, setWordWidth] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)
  const measureRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // first word width
  useEffect(() => {
    if (measureRef.current && rotatingWords.length > 0) {
      measureRef.current.innerText = rotatingWords[0]
      setWordWidth(measureRef.current.offsetWidth + 15)
      setIsInitialized(true)
    }
  }, [rotatingWords])

  // change the word
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === rotatingWords.length - 1 ? 0 : prevIndex + 1
      )
    }, rotateInterval)

    return () => clearInterval(interval)
  }, [rotateInterval, rotatingWords.length])

  // measure the next word width
  useEffect(() => {
    if (isInitialized && measureRef.current) {
      const nextWord = rotatingWords[(currentIndex + 1) % rotatingWords.length]
      measureRef.current.innerText = nextWord
      setWordWidth(measureRef.current.offsetWidth + 15)
    }
  }, [currentIndex, rotatingWords, isInitialized])

  return (
    <div className={`rotatingText flex items-center ${className}`}>
      <motion.span layout transition={{ type: "spring", stiffness: 300, damping: 25 }} className="pe-2">
        {constantText}
      </motion.span>

      <span
        ref={measureRef}
        className="absolute invisible h-0 overflow-hidden whitespace-nowrap"
      />

      <motion.div
        ref={containerRef}
        style={{ width: isInitialized ? wordWidth : 'auto',
          backgroundColor: backGroundColor,
          color: textColor
         }}
        layout
        className={"p-2 rounded-lg overflow-hidden inline-block relative"}
        initial={false}
      >
        {/* Current word */}
        <motion.span
          key={`out-${currentIndex}`}
          initial={{ y: 0 }}
          animate={{ y: '-150%' }}
          transition={{ duration: animationDuration / 2 }}
          className="block relative whitespace-nowrap"
        >
          {rotatingWords[currentIndex]}
        </motion.span>

        {/* Next word */}
        <motion.span
          key={`in-${currentIndex}`}
          initial={{ y: '150%' }}
          animate={{ y: 0 }}
          transition={{ duration: animationDuration / 2 }}
          className="block absolute top-0 left-0 p-2 whitespace-nowrap"
        >
          {rotatingWords[(currentIndex + 1) % rotatingWords.length]}
        </motion.span>
      </motion.div>
    </div>
  )
}

export default RotatingText