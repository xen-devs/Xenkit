'use client'
import React, { useState, useRef } from 'react'
import Code from './Code'
import Tab from './Tab'
import InputBox from './InputBox'

interface ComponentPreviewProps {
  componentProps: any
  setComponentProps: React.Dispatch<React.SetStateAction<any>>
  component: React.ReactNode
  code: string
  title: string
  importCode: string
}

export default function ComponentPreview ({
  component,
  code,
  title,
  importCode,
  componentProps,
  setComponentProps
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState('Preview')
  const inputRefs = useRef<{
    [key: string]: React.RefObject<HTMLInputElement | null>
  }>(
    Object.keys(componentProps).reduce((acc, key) => {
      acc[key] = React.createRef<HTMLInputElement>()
      return acc
    }, {} as { [key: string]: React.RefObject<HTMLInputElement | null> })
  )
  const handleInputChange = (key: string) => {
    const ref = inputRefs.current[key]
    if (ref.current) {
      let val: string|number = ref.current.value;
      if(!isNaN(Number(val)) && val.trim()!=='' ) {
        val = Number(val)
      }
      setComponentProps({
        ...componentProps,
        [key]: val
      })
    }
  }
  return (
    <div>
      <div className='flex justify-between items-center flex-wrap'>
        <h1 className='text-4xl mb-3 font-semibold'>{title}</h1>
        <Tab
          tabs={['Preview', 'Code']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {activeTab === 'Preview' ? (
        <div>
          <div className='flex justify-center items-center h-[400px] border border-[#212121] p-4 rounded-lg bg-[#0a0a0a] shadow-md'>
            {component}
          </div>
        </div>
      ) : (
        <div>
          <h1 className='text-2xl mt-4'>Import</h1>
          <Code code={importCode} />
          <h1 className='text-2xl mt-4'>Code</h1>
          <Code code={code} />
        </div>
      )}
      <div>
        <h1 className='text-2xl font-semibold mt-2'>Customize</h1>
        {Object.keys(componentProps).map(
          key =>
            key !== 'className' && (
              <InputBox
                key={key}
                ref={inputRefs.current[key]}
                label={key}
                defaultValue={componentProps[key]}
                onChange={() => handleInputChange(key)}
              />
            )
        )}
      </div>
    </div>
  )
}
