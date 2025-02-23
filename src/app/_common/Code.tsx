import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useState } from 'react'

interface CodeProps {
  code: string
}

function Code ({ code }: CodeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 bg-gray-800 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm transition-all"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <SyntaxHighlighter
        language="tsx"
        style={vscDarkPlus}
        customStyle={{
          borderRadius: "8px",
          padding: "16px",
          background: "#1e1e1e",
          fontSize: "14px",
          zIndex: 1
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default Code
