import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ArrowDriftProps {
  text?: string
  repeat?: number
  duration?: number
  className?: string
  delimiter?: string
}

const ArrowDrift: React.FC<ArrowDriftProps> = ({
  text ="Hello",
  repeat = -1,
  className = "text-2xl",
  delimiter = '>>',
  duration = 0.25
}) => {
  function arrowShifting (word: string, delimiter: string) {
    let pattern = []
    word = delimiter + word
    pattern.push(word)
    for (let i = 0; i < word.length - 2; i++) {
      let last = word[word.length - 1]
      word = last + word.slice(0, word.length - 1)
      pattern.push(word)
    }
    console.log('pattern: ', pattern)
    return pattern
  }
  const textRef = useRef<HTMLHeadingElement | null>(null)
  const allWords = arrowShifting(text, delimiter)
  useEffect(() => {
    if (!textRef.current) return
    const timeline = gsap.timeline({ repeat, repeatDelay: 0 })

    allWords.forEach(word => {
      timeline
        .to(textRef.current, {
          duration: 0.01,
          onComplete: () => {
            if (textRef.current) textRef.current.textContent = word
          }
        })
        .to(textRef.current, { duration })
    })

    timeline.play()
    return () => {
      timeline.kill()
    }
  }, [allWords, repeat, duration,delimiter])
  return (
    <h1
      ref={textRef}
      className={`text-center fira-mono ${className}`}
    >
      {allWords[0]}
    </h1>
  )
}

export default ArrowDrift
