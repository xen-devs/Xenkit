import React, { forwardRef } from 'react'

interface InputBoxProps {
  placeholder?: string
  label?: string
  inputRef?: React.RefObject<HTMLInputElement>
  defaultValue?: string | number;
  onChange: ()=>void;
    maxLength?: number;
    type?: string;
}

const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(
    ({ placeholder, label,defaultValue,onChange, maxLength=15,type="text"}, ref) => {

        const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
            if(e.target.value.length >= maxLength){
                e.preventDefault();
                return;
            }
            onChange();
        }
  return (
    <div className='flex flex-col'>
      {label ? <label className='text-lg mt-2 mb-1' htmlFor={label}>{label}</label> : null}
      <input
        id={label}
        ref={ref}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={handleChange}
        className='w-80 border border-[#212121] p-2 rounded-lg bg-[#0a0a0a] shadow-md focus:outline-none active:outline-none'
      />
    </div>
  )
})

InputBox.displayName = 'InputBox'

export default InputBox