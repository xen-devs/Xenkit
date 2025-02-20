import { ReactNode } from 'react'

export default function DocsLayout ({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Navbar */}
      {/* Sidebar */}
      <div className='flex-1 p-4'>{children}</div>
    </div>
  )
}
