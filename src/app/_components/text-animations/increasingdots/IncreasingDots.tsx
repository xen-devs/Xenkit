import React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";


interface IncreasingDotsProps {
  word: string;
  repeat?: number;
  className?: string;
  duration?: number;
}
const generateWords = (word: string): string[] => {
  const words: string[] = [];
  const wordLength = word.length;
  words.push(word);
  for (let i = 1; i < wordLength; i++) {
    let newWord = "";
    for (let j = 0; j < wordLength; j++) {
      newWord += word[j];
      if (j < i) {
        newWord += ".";
      }
    }
    words.push(newWord);
  }

  for (let i = wordLength - 2; i >= 0; i--) {
    let newWord = "";
    for (let j = 0; j < wordLength; j++) {
      newWord += word[j];
      if (j < i) {
        newWord += ".";
      }
    }
    words.push(newWord);
  }

  return words;
};

const IncreasingDots: React.FC<IncreasingDotsProps> = ({ 
  word,
  repeat = 3,
  className = "",
  duration = 0.15,
 }) => {
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const words = generateWords(word);

  useEffect(() => {
    if (!textRef.current) return;
    const timeline = gsap.timeline({ repeat, repeatDelay: 0 });

    words.forEach((word) => {
      timeline
        .to(textRef.current, {
          duration: 0.01,
          onComplete: () => {
            if (textRef.current) textRef.current.innerHTML = word;
          },
        })
        .to(textRef.current, { duration });
    });

    timeline.play();
    return () => {
      timeline.kill();
    };
  }, [words, repeat, duration]);

  return (
      <h1 ref={textRef} className={`text-4xl font-bold ${className}`}>
        {words[0]}
      </h1>
  );

};

export default IncreasingDots;
