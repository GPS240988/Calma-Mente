'use client'

import React from 'react'

interface PageLayoutProps {
  children: React.ReactNode
  header?: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, header }) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#E7E2FA] via-[#FBF7FC] to-[#F1F6F9] text-[#2C3E38] flex flex-col font-sans">
      {/* Soft sunrise warm radial glow behind the center content */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-tr from-[#FFF3D1] to-[#FFFBF0] opacity-40 blur-[80px] pointer-events-none select-none z-0" />

      {/* Botanical Leaves - Top Left */}
      <svg
        className="absolute top-0 left-0 w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px] pointer-events-none select-none z-10"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stem */}
        <path d="M-10 -10C40 30 90 90 140 110" stroke="#7A8E77" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
        
        {/* Leaf 1 (Top Left) */}
        <path d="M12 25C-2 40 -8 70 8 85C20 70 24 40 12 25Z" fill="url(#topLeafGrad1)" opacity="0.75" />
        {/* Leaf 2 */}
        <path d="M45 42C25 58 18 88 35 102C48 88 50 58 45 42Z" fill="url(#topLeafGrad2)" opacity="0.75" />
        {/* Leaf 3 */}
        <path d="M85 62C65 78 58 108 75 122C88 108 90 78 85 62Z" fill="url(#topLeafGrad1)" opacity="0.7" />
        {/* Leaf 4 (Pointing down) */}
        <path d="M125 85C108 105 105 135 120 148C132 132 135 105 125 85Z" fill="url(#topLeafGrad2)" opacity="0.65" />
        {/* Leaf 5 (Small side leaf) */}
        <path d="M70 30C62 15 45 5 35 20C45 32 60 38 70 30Z" fill="url(#topLeafGrad1)" opacity="0.7" />
        {/* Leaf 6 (Small side leaf) */}
        <path d="M110 60C102 45 85 35 75 50C85 62 100 68 110 60Z" fill="url(#topLeafGrad2)" opacity="0.65" />
        {/* Leaf 7 (Branch Tip) */}
        <path d="M140 110C148 115 158 112 162 102C155 92 142 98 140 110Z" fill="url(#topLeafGrad1)" opacity="0.8" />

        <defs>
          <linearGradient id="topLeafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8DA38B" />
            <stop offset="100%" stopColor="#B4C7B2" />
          </linearGradient>
          <linearGradient id="topLeafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7E947C" />
            <stop offset="100%" stopColor="#A6BAA4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating leaf near top-right */}
      <svg
        className="absolute top-[22%] right-[15%] w-6 h-6 md:w-8 md:h-8 pointer-events-none select-none z-10 rotate-[25deg] opacity-60 animate-pulse duration-[5000ms]"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 25C15 15 35 10 45 25C35 35 15 35 5 25Z" fill="#93A891" />
      </svg>

      {/* Floating leaf near bottom-left */}
      <svg
        className="absolute bottom-[28%] left-[8%] w-8 h-8 md:w-10 md:h-10 pointer-events-none select-none z-10 rotate-[-35deg] opacity-50 animate-pulse duration-[6000ms]"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 25C15 15 35 10 45 25C35 35 15 35 5 25Z" fill="#859B83" />
      </svg>

      {/* Botanical Leaves - Bottom Right */}
      <svg
        className="absolute bottom-0 right-0 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] pointer-events-none select-none z-10 rotate-180"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stem */}
        <path d="M-10 -10C40 30 90 90 140 110" stroke="#7A8E77" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
        
        {/* Leaf 1 */}
        <path d="M12 25C-2 40 -8 70 8 85C20 70 24 40 12 25Z" fill="url(#bottomLeafGrad1)" opacity="0.75" />
        {/* Leaf 2 */}
        <path d="M45 42C25 58 18 88 35 102C48 88 50 58 45 42Z" fill="url(#bottomLeafGrad2)" opacity="0.8" />
        {/* Leaf 3 */}
        <path d="M85 62C65 78 58 108 75 122C88 108 90 78 85 62Z" fill="url(#bottomLeafGrad1)" opacity="0.7" />
        {/* Leaf 4 */}
        <path d="M125 85C108 105 105 135 120 148C132 132 135 105 125 85Z" fill="url(#bottomLeafGrad2)" opacity="0.75" />

        <defs>
          <linearGradient id="bottomLeafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93A891" />
            <stop offset="100%" stopColor="#BACDB8" />
          </linearGradient>
          <linearGradient id="bottomLeafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#859B83" />
            <stop offset="100%" stopColor="#ADBFA9" />
          </linearGradient>
        </defs>
      </svg>

      {/* Decorative Wave Lines - Bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-16 pointer-events-none select-none z-0 opacity-25"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,80 C240,95 480,95 720,80 C960,65 1200,65 1440,80 L1440,100 L0,100 Z" fill="#D3C9F0" />
        <path d="M0,60 C360,90 720,40 1080,70 C1260,85 1380,80 1440,75 L1440,100 L0,100 Z" fill="#E2D9F8" opacity="0.5" />
      </svg>

      {/* Page Header (if provided) */}
      {header && (
        <header className="relative w-full z-30 px-6 pt-6 pb-2 flex items-center justify-between">
          {header}
        </header>
      )}

      {/* Page Main Content */}
      <main className="relative z-20 flex-1 flex flex-col p-6 sm:p-12">
        {children}
      </main>
    </div>
  )
}
