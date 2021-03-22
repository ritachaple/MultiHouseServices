import React from 'react'
import { View, Text, Image } from 'react-native'

export const DefaultSentiment = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="11.5" stroke="#B6B6B6" strokeDasharray="2 2" />
      <circle cx="9" cy="10" r="1" fill="#C4C4C4" />
      <path stroke="#BCBCBC" d="M8 14c1.333 1.51 4.5 3 8 0" />
      <circle cx="15" cy="10" r="1" fill="#C4C4C4" />
    </svg>
  )
}

export const NegativeSentiment = () => {
  return (
    <Image
      source={{
        uri: 'https://unoboat.s3.ap-south-1.amazonaws.com/negative.svg',
      }}
      style={{ width: '100%', height: '120%' }}
    />
  )
}

export const PositiveSentiment = () => {
  return (
    <Image
      source={{
        uri: 'https://unoboat.s3.ap-south-1.amazonaws.com/positive.svg',
      }}
      style={{ width: '100%', height: '120%' }}
    />
  )
}

export const NeutralSentiment = () => {
  return (
    <Image
      source={{
        uri: 'https://unoboat.s3.ap-south-1.amazonaws.com/neutral.svg',
      }}
      style={{ width: '100%', height: '120%' }}
    />
  )
}
