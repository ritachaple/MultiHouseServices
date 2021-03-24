import React from 'react'
import { View, Text } from 'react-native'

export const Default = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path fill="#B6B6B6" d="M6.72 5.76H7.552V19.2H6.72z" />
      <path
        stroke="#B6B6B6"
        d="M15.425 9.205l-.302.335.302.335 2.652 2.945H7.22V6.26h10.857l-2.652 2.945z"
      />
      <circle cx="12" cy="12" r="11.5" stroke="#B6B6B6" strokeDasharray="2 2" />
    </svg>
  )
}

export const Medium = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="20"
      fill="none"
      viewBox="0 0 19 20"
    >
      <path fill="#1877F2" d="M0 0H1.25V20H0z" />
      <path fill="#1877F2" d="M18.75 0H0v11.25h18.75l-5.114-5.625L18.75 0z" />
    </svg>
  )
}

export const High = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="20"
      fill="none"
      viewBox="0 0 19 20"
    >
      <path fill="#F5CC63" d="M0 0H1.25V20H0z" />
      <path fill="#F5CC63" d="M18.75 0H0v11.25h18.75l-5.114-5.625L18.75 0z" />
    </svg>
  )
}

export const Low = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="20"
      fill="none"
      viewBox="0 0 19 20"
    >
      <path fill="#6ACE59" d="M0 0H1.25V20H0z" />
      <path fill="#6ACE59" d="M18.75 0H0v11.25h18.75l-5.114-5.625L18.75 0z" />
    </svg>
  )
}

export const Urgent = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="20"
      fill="none"
      viewBox="0 0 19 20"
    >
      <path fill="#FF0000" d="M0 0H1.25V20H0z" />
      <path fill="#FF0000" d="M18.75 0H0v11.25h18.75l-5.114-5.625L18.75 0z" />
    </svg>
  )
}
