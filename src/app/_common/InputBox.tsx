import React, { forwardRef } from 'react'

interface InputBoxProps {
  placeholder?: string
  label?: string
  inputRef?: React.RefObject<HTMLInputElement>
  defaultValue?: string | number;
  onChange: ()=>void;
}

const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(
    ({ placeholder, label,defaultValue,onChange }, ref) => {
  return (
    <div className='flex flex-col'>
      {label ? <label className='text-lg mt-2 mb-1' htmlFor={label}>{label}</label> : null}
      <input
        id={label}
        ref={ref}
        type='text'
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        className='w-80 border border-[#212121] p-2 rounded-lg bg-[#0a0a0a] shadow-md focus:outline-none active:outline-none'
      />
    </div>
  )
})

InputBox.displayName = 'InputBox'

export default InputBox