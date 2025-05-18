import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface DashTrailProps {
  text?: string
  repeat?: number
  duration?: number
  className?: string
}

const DashTrail: React.FC<DashTrailProps> = ({ text,repeat,duration,className }) => {
  function dashLoading (word:string) {
    let pattern: string[][] = []
    let tempWord = word + '____'
    let forward: string[] = []
    for (let i = 0; i < 5; i++) {
      forward.push(tempWord)
      tempWord = tempWord.slice(0, tempWord.length - 1)
      tempWord = '_' + tempWord
    }

    pattern.push([...forward])
    forward.pop()
    let backword = [...forward].reverse()
    pattern.push(backword)


    // this is for removing the dashes at last & make it normal word without any dashes, this didn't work
    // word = word + '___ '
    // for (let i = 0; i < 3; i++) {
    //   pattern.push([word])
    //   const tempWord = word.split('')
    //   // console.log('tempWord: ', tempWord);
    //   tempWord[tempWord.length - i - 2] = ' '
    //   word = tempWord.join('')
    // }
    // pattern.push([word])
    // word = word.slice(0, word.length - 1)

    return pattern.flat()
  }

  const allWords = dashLoading(text || 'Loading')
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const timeline = gsap.timeline({ repeat, repeatDelay: 0 });

    allWords.forEach((word) => {
      timeline
        .to(textRef.current, {
          duration: 0.01,
          onComplete: () => {
            if (textRef.current) textRef.current.innerHTML = word;
          },
        })
        .to(textRef.current, { duration});
    });

    timeline.play();
    return () => {
      timeline.kill();
      if (textRef.current) textRef.current.innerHTML = allWords[0];
    };
  }, [allWords, repeat, duration]);

  return (

      <h1 ref={textRef} className={`text-center font-semibold roboto-mono ${className}`}>
        {allWords[0]}
      </h1>
  );
}

export default DashTrail
