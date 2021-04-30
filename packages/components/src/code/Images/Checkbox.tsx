import React from 'react'
import { View, Text } from 'react-native'

export const Checked = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="#001163"
        d="M17.5 2.5h-15v15h15v-15zM8.333 14.167L4.167 10l1.175-1.175 2.991 2.983 6.325-6.325 1.175 1.184-7.5 7.5z"
      />
    </svg>
  )
}

export const UnChecked = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="#D6D9E6"
        d="M15.833 4.167v11.666H4.167V4.167h11.666zM17.5 2.5h-15v15h15v-15z"
      />
    </svg>
  )
}
