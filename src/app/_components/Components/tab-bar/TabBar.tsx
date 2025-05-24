'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

type Tab = {
  name: string
  backgroundColor: string
  image: string
  onClick?: () => void
}

interface TabBarProps {
  tabs: Tab[]
  activeTab: string
  onTabChange?: (tabName: string) => void
}

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabChange }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [widths, setWidths] = useState<number[]>([])

  useEffect(() => {
    const measured = labelRefs.current.map(el => el?.offsetWidth || 0)
    setWidths(measured)
  }, [tabs, activeTab])

  useEffect(() => {
    const index = tabs.findIndex(tab => tab.name === activeTab)
    if (index !== -1) {
      setActiveIndex(prevIndex => {
        if (prevIndex !== index) return index
        return prevIndex
      })
    }
  }, [activeTab, tabs])

  return (
    <div
      className='tabBar w-full scrollbar-hide'
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <div className='flex flex-row gap-2 min-h-[60px] items-center'>
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex
          const targetWidth = widths[index] || 0

          return (
            <motion.div
              key={tab.name}
              onClick={() => {
                if (index !== activeIndex) {
                  setActiveIndex(index)
                  if (tab.onClick) tab.onClick()
                  if (tab.name !== activeTab && onTabChange) {
                    onTabChange(tab.name)
                  }
                }
              }}
              className={`relative flex items-center rounded-[20px] cursor-pointer px-5 py-4 flex-shrink-0`}
              style={{
                backgroundColor: tab.backgroundColor,
                color: 'white',
                minWidth: isActive ? 69 + targetWidth : 50,
                height: '50px',
                transition: 'min-width 0.3s ease'
              }}
            >
              <div className='flex items-center justify-center w-[19px] h-[19px]'>
                <Image
                  src={tab.image}
                  alt={tab.name}
                  width={19}
                  height={19}
                  style={{
                    minWidth: '19px',
                    minHeight: '19px'
                  }}
                />
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.span
                    key={tab.name}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: targetWidth }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                    className='ml-2 whitespace-nowrap overflow-hidden inline-block absolute left-[2.5rem]'
                  >
                    {tab.name}
                  </motion.span>
                )}
              </AnimatePresence>
              <span
                className='ml-2 whitespace-nowrap absolute opacity-0 pointer-events-none'
                ref={el => {
                  labelRefs.current[index] = el
                }}
              >
                {tab.name}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default TabBar
