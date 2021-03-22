import React from 'react'
import { StyleSheet } from 'react-native'

const SelectBoxList = (props: any) => {
  const { data, handleonchange } = props
  return (
    <select
      // className="form-control"
      // id="fruit"
      onChange={(val) => {
        handleonchange(val.target.value)
      }}
    >
      {data.map((item: any) => (
        <option>{item.text}</option>
      ))}
    </select>
  )
}

const styles = StyleSheet.create({})

export default SelectBoxList
