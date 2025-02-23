import React from 'react'

interface TabProps{
    tabs:string[],
    activeTab:string,
    setActiveTab:React.Dispatch<React.SetStateAction<string>>
}


function Tab({tabs, activeTab, setActiveTab}:TabProps) {
  return (
    <div className='flex bg-[#181818] rounded-lg p-1 mb-4 md:mb-4'>
        {tabs.map((tab, index) => (
            <button
            key={index}
            className={`${
                activeTab === tab
                ? 'bg-[#d3d3d3] text-black'
                : ' text-white'
            } px-2 rounded transition-all ease-in-out duration-300`}
            onClick={() => setActiveTab(tab)}
            >
            {tab}
            </button>
        ))}
    </div>
  )
}

export default Tab