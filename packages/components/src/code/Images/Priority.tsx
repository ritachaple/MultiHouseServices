import React from 'react'
import { Image } from 'react-native'

export const Default = () => {
  return (
    <Image
      source={{
        uri: 'https://unoboat.s3.ap-south-1.amazonaws.com/default_priority.svg',
      }}
      style={{ width: '80%', height: '100%' }}
    />
  )
}

export const Medium = () => {
  return (
    <Image
      source={{
        uri: 'https://unoboat.s3.ap-south-1.amazonaws.com/blueflag.svg',
      }}
      style={{ width: '80%', height: '100%' }}
    />
  )
}

export const High = () => {
  return (
    <Image
      source={{
        uri: 'https://unoboat.s3.ap-south-1.amazonaws.com/yelloflag.svg',
      }}
      style={{ width: '80%', height: '100%' }}
    />
  )
}

export const Low = () => {
  return (
    <Image
      source={{
        uri: 'https://unoboat.s3.ap-south-1.amazonaws.com/greenflag.svg',
      }}
      style={{ width: '80%', height: '100%' }}
    />
  )
}

export const Urgent = () => {
  return (
    <Image
      source={{
        uri: 'https://unoboat.s3.ap-south-1.amazonaws.com/redflag.svg',
      }}
      style={{ width: '80%', height: '100%' }}
    />
  )
}
