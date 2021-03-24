import React, { useState } from 'react'
import { View, Text } from 'react-native'
// @ts-ignore
import Select from 'react-select'

export const Interaction2Edit = (props: any) => {
  const { list, onSelectedItem } = props

  return (
    <View>
      <select
        className="dropdown-input"
        onChange={(val) => {
          onSelectedItem(val.target.value)
        }}
      >
        {list !== undefined &&
          list.length > 0 &&
          list.map((item: any) => <option>{item.text}</option>)}
      </select>
    </View>
  )
}

// export const ReactSelect = (props: any) => {
//   const { list, onSelectedItem } = props

//   const [selectedOpt, setSelectedOption] = useState()

//   const handleChange = (selectedOption: any) => {
//     setSelectedOption(selectedOption)
//     onSelectedItem(selectedOption)
//     console.log(`Option selected:`, selectedOption);
//   };

//   // const options = list.map(function (item: any) {
//   //   return { value: item, label: item.text };
//   // })

//   const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
//   ];

//   return (
//     <Select
//       value={selectedOpt}
//       onChange={handleChange}
//       // labelKey='name'
//       // valueKey='countryCode'
//       options={options}
//     />
//   )
// }
