import React, { useState } from 'react'
import { View, Text } from 'react-native'
import Select from 'react-select'

export const StatusDropdown = (props: any) => {
  const { list, onStatusSelect } = props

  const [selectedOption, setSelectedOption] = useState(null)
  const options =
    list !== undefined &&
    list.length > 0 &&
    list.map(function (item: any) {
      return { value: item.status_id, label: item.status_name }
    })

  const onSelect = (val: any) => {
    setSelectedOption(val)
    onStatusSelect(val)
  }

  return (
    <Select
      menuPortalTarget={document.querySelector('body')}
      defaultValue={selectedOption}
      onChange={(value: any) => {
        onSelect(value)
      }}
      options={options}
    />
  )
}

export const SentimentSelect = (props: any) => {
  const { list, onStatusSelect } = props

  const [selectedOption, setSelectedOption] = useState(null)

  const options =
    list !== undefined &&
    list.length > 0 &&
    list.map(function (item: any) {
      return { value: item.id, label: item.text }
    })

  const onSelect = (val: any) => {
    setSelectedOption(val)
    onStatusSelect(val)
  }

  return (
    <Select
      menuPortalTarget={document.querySelector('body')}
      defaultValue={selectedOption}
      onChange={(value: any) => {
        onSelect(value)
      }}
      options={options}
    />
  )
}

export const DropdownList = (props: any) => {
  const { list, onSelectValue } = props

  const [selectedOption, setSelectedOption] = useState(null)

  const options =
    list !== undefined &&
    list.length > 0 &&
    list.map(function (item: any) {
      return { value: item.value, label: item.text }
    })

  const onSelect = (val: any) => {
    setSelectedOption(val)
    onSelectValue(val)
  }

  return (
    <Select
      menuPortalTarget={document.querySelector('body')}
      defaultValue={selectedOption}
      onChange={(value: any) => {
        onSelect(value)
      }}
      options={options}
    />
  )
}
