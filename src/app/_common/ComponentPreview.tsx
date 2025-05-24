'use client'
import React, { useState, useRef } from 'react'
import Code from './Code'
import Tab from './Tab'
import InputBox from './InputBox'

interface ComponentPreviewProps {
  componentProps: { [key: string]: any }
  setComponentProps: React.Dispatch<React.SetStateAction<any>>
  component: React.ReactNode
  code: string
  title: string
  importCode: string
  maxLength?: number
  isVerticallyCentered?: boolean
  isHorizontallyCentered?: boolean
  propControls?: {
    [key: string]: {
      type:
        | 'text'
        | 'number'
        | 'select'
        | 'hidden'
        | 'note'
        | 'color'
        | 'array'
        | 'boolean'
      options?: string[] // only for select
      noteText?: string // only for note
      defaultValue?: string | number | string[] // only for array
      label?: string
      min?: number
      max?: number
      step?: number
    }
  }
}

export default function ComponentPreview ({
  component,
  code,
  title,
  importCode,
  componentProps,
  setComponentProps,
  isVerticallyCentered,
  isHorizontallyCentered,
  propControls
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
      let val: string | number | string[] = ref.current.value
      if (!isNaN(Number(val)) && val.trim() !== '') {
        val = Number(val)
      }
      setComponentProps((prev: typeof componentProps) => ({
        ...prev,
        [key]: val
      }))
    }
  }

  return (
    <div className='w-full overflow-hidden'>
      <div className='flex justify-between items-center flex-wrap'>
        <h1 className='text-4xl mb-3 font-semibold'>{title}</h1>
        <Tab
          tabs={['Preview', 'Code']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {activeTab === 'Preview' ? (
        <div
          className={`
          relative
          min-h-[400px]
          border border-[#212121]
          p-4 rounded-lg
          bg-[#0a0a0a]
          shadow-md
          overflow-x-auto
        `}
        >
          <div
            className={`
            ${isHorizontallyCentered ? 'flex justify-center' : ''}
            ${isVerticallyCentered ? 'flex items-center min-h-[400px]' : ''}
            ${
              isHorizontallyCentered || isVerticallyCentered
                ? 'w-max mx-auto'
                : ''
            }
          `}
          >
            <div
              className={`
              ${isHorizontallyCentered ? '' : 'min-w-full'}
              ${isVerticallyCentered ? 'flex items-center' : ''}
            `}
            >
              {component}
            </div>
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
        {propControls && Object.keys(propControls).length > 1 &&  (
          <h1 className='text-2xl font-semibold mt-2'>Customize</h1>
        )}
        {Object.entries(propControls || {}).map(([key, control]) => {
          // console.log('control: ', control);

          if (control?.type === 'hidden' || key === 'className') return null

          if (control?.type === 'note') {
            return (
              <div
                key={key}
                className='mt-4 border border-[#333] p-4 rounded bg-[#111]'
              >
                <p className='text-grey-500'>Note: {control.noteText}</p>
              </div>
            )
          }

          if (control?.type === 'color') {
            return (
              <div key={key} className='mt-2'>
                <label className='block mb-1 font-medium'>
                  {control.label ? control.label : key}
                </label>
                <input
                  type='color'
                  value={`${componentProps[key]}`}
                  onChange={e =>
                    setComponentProps((prev: typeof componentProps) => ({
                      ...prev,
                      [key]: e.target.value
                    }))
                  }
                  className='bg-[#111] text-white p-2 rounded border border-[#333] outline-none'
                />
              </div>
            )
          }

          if (control?.type === 'select') {
            return (
              <div key={key} className='mt-2'>
                <label className='block mb-1 font-medium'>
                  {control.label ? control.label : key}
                </label>
                <select
                  value={componentProps[key]}
                  onChange={e =>
                    setComponentProps((prev: typeof componentProps) => ({
                      ...prev,
                      [key]: e.target.value
                    }))
                  }
                  className='bg-[#111] text-white p-2 rounded border border-[#333] outline-none'
                >
                  {control.options?.map(opt => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            )
          }
          if (control?.type == 'boolean') {
            return (
              <div key={key} className='mt-2 flex items-center gap-2'>
                <label className='block mb-1 font-medium'>
                  {control.label ? control.label : key}
                </label>
                <input
                  type='checkbox'
                  checked={componentProps[key]}
                  onChange={e =>
                    setComponentProps((prev: typeof componentProps) => ({
                      ...prev,
                      [key]: e.target.checked
                    }))
                  }
                  className='bg-[#111] text-white p-2 rounded border border-[#333] outline-none'
                />
              </div>
            )
          }

          // make the input box work both ofr umber & string

          return (
            <InputBox
              key={key}
              ref={inputRefs.current[key]}
              label={control.label ? control.label : key}
              min={control?.min}
              max={control?.max}
              step={control?.step}
              type={control?.type === 'number' ? 'number' : 'text'}
              defaultValue={componentProps[key]}
              onChange={() => handleInputChange(key)}
            />
          )
        })}
      </div>
    </div>
  )
}
