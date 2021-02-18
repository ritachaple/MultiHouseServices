import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'

export default function CustomeDropdowmModal(props: any) {
  const [modalVisible, setmodalVisible] = useState(false)
  const [dropdownOpen, setdropdownOpen] = useState(false)
  const [label, setlabel] = useState('')

  useEffect(() => {
    const selected = props.selectValue || ''

    props.options.map((item: any, i: any) => {
      if (item.value === selected) {
        setlabel(item.label)
      }
      return item.label
    })
  }, [props])

  const OpenModal = () => {
    setmodalVisible(true)
  }

  const Overlay = () => {
    setmodalVisible(false)
  }

  const OpenDropdown = () => {
    setdropdownOpen(!dropdownOpen)
  }

  const {
    label: Any,
    title,
    mode,
    options,
    placeholder,
    height,
    selectedOnPress,
    selectedLabel,
    ...otherProps
  } = props
  return (
    <View>
      <Text>Hello</Text>
    </View>
  )
}

CustomeDropdowmModal.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,

  options: PropTypes.arrayOf(PropTypes.object),

  selectValue: PropTypes.string,

  mode: PropTypes.oneOf(['dropdown', 'modal', 'selected']),

  height: PropTypes.string,
}

CustomeDropdowmModal.defaultProps = {
  title: '',
  label: '',
  selectValue: '',

  placeholder: 'Select Option',

  mode: 'dropdown',

  height: '50%',

  options: [
    {
      label: 'Option 1',

      value: '1',
    },
    {
      label: 'Option 2',

      value: '2',
    },
  ],
}
