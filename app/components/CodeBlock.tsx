"use client";

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
}

export default function CodeBlock({ 
  code, 
  language = 'bash', 
  title, 
  showLineNumbers = false, 
  copyable = true 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {title && (
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">{title}</span>
            {copyable && (
              <button
                onClick={handleCopy}
                className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
              >
                {copied ? '✓ Copiado' : '📋 Copiar'}
              </button>
            )}
          </div>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 text-sm text-green-400 font-mono overflow-x-auto">
          <code>{code}</code>
        </pre>
        {!title && copyable && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 text-xs text-gray-400 hover:text-white transition-colors duration-200 bg-gray-800 px-2 py-1 rounded"
          >
            {copied ? '✓' : '📋'}
          </button>
        )}
      </div>
    </div>
  );
}
