import React, { useState } from 'react'
import { View, Text } from 'react-native'
import Select from 'react-select'

const isMulti = true

export const StatusDropdown = (props: any) => {
  const { list, onStatusSelect, defaultValue } = props

  // const [selectedOption, setSelectedOption] = useState({ value: 1, label: 'xyz' })
  const [selectedOption, setSelectedOption] = useState(defaultValue as any)
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
      className="select_box"
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
  const { list, onStatusSelect, defaultValue } = props

  const [selectedOption, setSelectedOption] = useState(null)

  const options =
    list !== undefined &&
    list.length > 0 &&
    list.map(function (item: any) {
      // return { value: item.id, label: item.text }
      // return { value: item.id, label: <img src="https://unoboat.s3.ap-south-1.amazonaws.com/negative.svg" /> }
      return { value: item.id, label: <img src={item.url} alt="" /> }
    })

  const onSelect = (val: any) => {
    setSelectedOption(val)
    onStatusSelect(val)
  }

  return (
    <Select
      className="select_box"
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
      menuPlacement="auto"
      menuPortalTarget={document.querySelector('body')}
      defaultValue={selectedOption}
      onChange={(value: any) => {
        onSelect(value)
      }}
      options={options}
    />
  )
}

export const MultipleDropdownList = (props: any) => {
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
    console.log('valll', val)
    // let array: any = []

    // const list = val !== undefined && val.length > 0 && val.map((item: any) => {
    //   return item.value
    // })

    // console.log('list', list)

    // console.log("arrayyy", array);

    onSelectValue(val)
  }

  return (
    <Select
      isMulti={isMulti}
      menuPlacement="auto"
      menuPortalTarget={document.querySelector('body')}
      defaultValue={selectedOption}
      onChange={(value: any) => {
        onSelect(value)
      }}
      options={options}
    />
  )
}

export const MediaDropdownList = (props: any) => {
  const { list, onSelectValue } = props

  const [selectedOption, setSelectedOption] = useState(null)

  const options =
    list !== undefined &&
    list.length > 0 &&
    list.map(function (item: any) {
      return { value: item.medium_id, label: item.medium_name }
    })

  const onSelect = (val: any) => {
    setSelectedOption(val)
    console.log('valllmedia', val)
    // let array: any = []

    // const list = val !== undefined && val.length > 0 && val.map((item: any) => {
    //   return item.value
    // })

    // console.log('list', list)

    // console.log("arrayyy", array);

    onSelectValue(val)
  }

  return (
    <Select
      isMulti={isMulti}
      menuPlacement="auto"
      menuPortalTarget={document.querySelector('body')}
      defaultValue={selectedOption}
      onChange={(value: any) => {
        onSelect(value)
      }}
      options={options}
    />
  )
}

export const StatusDropdownList = (props: any) => {
  const { list, onSelectValue } = props

  const [selectedOption, setSelectedOption] = useState(null)

  const options =
    list !== undefined &&
    list.length > 0 &&
    list.map(function (item: any) {
      return { value: item.status_id, label: item.status_name }
    })

  const onSelect = (val: any) => {
    setSelectedOption(val)
    // console.log("valll", val);
    // let array: any = []

    // const list = val !== undefined && val.length > 0 && val.map((item: any) => {
    //   return item.value
    // })

    console.log('list', list)

    // console.log("arrayyy", array);

    onSelectValue(val)
  }

  return (
    <Select
      isMulti={isMulti}
      menuPlacement="auto"
      menuPortalTarget={document.querySelector('body')}
      defaultValue={selectedOption}
      onChange={(value: any) => {
        onSelect(value)
      }}
      options={options}
    />
  )
}

export const PaginationList = (props: any) => {
  const { list, onSelectValue } = props

  const [selectedOption, setSelectedOption] = useState(null)

  const options =
    list !== undefined &&
    list.length > 0 &&
    list.map((item: any, index: number) => {
      return { value: item, label: item }
    })

  const onSelect = (val: any) => {
    setSelectedOption(val)
    console.log('val', val)
    onSelectValue(val)
  }

  return (
    <Select
      menuPlacement="auto"
      menuPortalTarget={document.querySelector('body')}
      defaultValue={selectedOption}
      onChange={(value: any) => {
        onSelect(value)
      }}
      options={options}
    />
  )
}
