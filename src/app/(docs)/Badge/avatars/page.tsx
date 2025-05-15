'use client'
import Avatars from '@/app/_components/Badge/avatars/Avatars'
import ComponentPreview from '@/app/_common/ComponentPreview'
import { useState } from 'react'

export default function AvatarsDocs () {
  const [componentProps, setComponentProps] = useState<{
    variant: 'raise' | 'elastic' | 'bounce'
    images: string[]
  }>({
    variant: 'raise',
    images: [
      'https://avatars.githubusercontent.com/u/121240801?v=4',
      'https://avatars.githubusercontent.com/u/134832213?v=4',
      'https://avatars.githubusercontent.com/u/140481788?v=4'
    ]
  })

  const usage = `<Avatars 
  ${Object.entries(componentProps)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}="${value}"`
      }
      if (Array.isArray(value)) {
        return `${key}={[${value.map(v => `"${v}"`).join(', ')}]}`
      }
      return `${key}={${value}}`
    })
    .join('\n  ')} 
/>`

  return (
    <div className='p-4'>
      <ComponentPreview
        code={usage}
        componentProps={componentProps}
        setComponentProps={setComponentProps}
        component={<Avatars {...componentProps} />}
        title='Avatars'
        importCode="import Avatars from 'xenkit/Avatars'"
        maxLength={15}
        propControls={{
          variant: {
            type: 'select',
            options: ['raise', 'elastic', 'bounce']
          },
          images: {
            type: 'hidden'
          },
          note: {
            type: 'note',
            noteText: 'This avatar animation uses hover effects. For the best experience, please view it on a laptop or desktop.'
          },
        }}
      />
    </div>
  )
}
