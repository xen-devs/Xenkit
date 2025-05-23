'use client'
import SpotlightCard from '@/app/_components/Components/spotlight-card/SpotlightCard'
import ComponentPreview from '@/app/_common/ComponentPreview'
import { useState } from 'react'
import Image from 'next/image'

function CardContent () {
  return (
    <div className='flex flex-col p-4'>
      <Image src="/assets/spotlight-card/code.svg" width={30} height={30} className="mb-2 me-10" alt="bulb" />
      <p className='text-lg mb-2 text-gray'>
        Innovation
      </p>
      <p className='text-xl font-semibold text-gray-300'>Beautiful and reausable,</p>
      <p className='text-xl font-semibold text-gray-300'>by design.</p>
    </div>
  )
}

export default function SpotlightCardDocs () {
  const [componentProps, setComponentProps] = useState({
    spotlightColor: '#6600ff',
    spotlightSize: '30%',
    cardBackgroundColor: '#111111',
    cardBorderRadius: '20px',
    cardWidth: '270px',
    cardHeight: '270px',
    borderColor: '#222222'
  })

  const usage = `<SpotlightCard 
  ${Object.entries(componentProps)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}="${value}"`
      } else if (Array.isArray(value)) {
        return `${key}={${JSON.stringify(value)}}`
      } else if (typeof value === 'object') {
        return `${key}={${JSON.stringify(value)}}`
      } else if (typeof value === 'boolean') {
        return `${key}={${value}}`
      } else {
        return `${key}={${value}}`
      }
    })
    .join('\n  ')} 
> 
<h1>write your card code here</h1>
</SpotlightCard>;`

  return (
    <div className='p-4'>
      <ComponentPreview
        code={usage}
        componentProps={componentProps}
        setComponentProps={setComponentProps}
        component={
          <SpotlightCard {...componentProps}>
            <CardContent />
          </SpotlightCard>
        }
        title='Spotlight Card'
        importCode="import SpotlightCard from 'xenkit/SpotlightCard'"
        maxLength={15}
        isHorizontallyCentered={true}
        isVerticallyCentered={true}
        propControls={{
          spotlightColor: {
            type: 'color',
            label:"Spotlight Color"
          },
          cardBorderRadius: {
            type: 'text',
            label:"Card Border Radius"
          },
          spotlightSize: {
            type: 'text',
            label:"Spotlight Size"
          },
          cardBackgroundColor: {
            type: 'color',
            label:"Card Background Color"
          },
          borderColor: {
            type: 'color',
            label:"Border Color"
          },
          note: {
            type: 'note',
            noteText: 'This animation uses hover effects. For the best experience, please view it on a laptop or desktop.'
          },
        }}
      />
    </div>
  )
}
