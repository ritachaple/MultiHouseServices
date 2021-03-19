import React from 'react'
import { View, Text } from 'react-native'

export const Filter = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="10"
      fill="none"
      viewBox="0 0 12 10"
    >
      <path
        fill="#001163"
        d="M12 1a1 1 0 00-1-1H1a1 1 0 000 2h10a1 1 0 001-1zM10 5a1 1 0 00-1-1H3a1 1 0 100 2h6a1 1 0 001-1zM7 8a1 1 0 110 2H5a1 1 0 010-2h2z"
      />
    </svg>
  )
}

export const Plus = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 30 30"
    >
      <rect
        width="29"
        height="29"
        x="0.5"
        y="0.5"
        fill="#fff"
        stroke="#E6E6E6"
        rx="5.5"
      />
      <path
        fill="#000"
        d="M15 21a1 1 0 001-1v-4h4a1 1 0 100-2h-4v-4a1 1 0 10-2 0v4h-4a1 1 0 100 2h4v4a1 1 0 001 1z"
      />
    </svg>
  )
}

export const Line = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1"
      height="40"
      fill="none"
      viewBox="0 0 1 40"
    >
      <path stroke="#DEDEDE" d="M0.5 0L0.5 40" />
    </svg>
  )
}

export const TileGrid = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="99"
      height="49"
      fill="none"
      viewBox="0 0 99 49"
    >
      <g filter="url(#filter0_d)">
        <rect
          width="88"
          height="38"
          x="5.5"
          y="5.5"
          fill="#fff"
          stroke="#D7D7D7"
          rx="5.5"
        />
      </g>
      <path fill="#001163" d="M48 6h40a5 5 0 015 5v28a4 4 0 01-4 4H48V6z" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M63 18a3 3 0 00-3 3v8a3 3 0 003 3h14a3 3 0 003-3v-8a3 3 0 00-3-3H63zm2 2h-2a1 1 0 00-1 1v1h3v-2zm2 0v2h11v-1a1 1 0 00-1-1H67zm-2 4h-3v2h3v-2zm2 2v-2h11v2H67zm-2 2h-3v1a1 1 0 001 1h2v-2zm2 2v-2h11v1a1 1 0 01-1 1H67z"
        clipRule="evenodd"
      />
      <path
        fill="#CAC5C5"
        fillRule="evenodd"
        d="M18 18v6h18v-6H18zm16 2H20v2h14v-2zM18 26v6h18v-6H18zm16 2H20v2h14v-2z"
        clipRule="evenodd"
      />
      <path
        fill="#CAC5C5"
        fillRule="evenodd"
        d="M18 26v6h18v-6H18zm16 2H20v2h14v-2z"
        clipRule="evenodd"
      />
      <defs>
        <filter
          id="filter0_d"
          width="99"
          height="49"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.5" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}
