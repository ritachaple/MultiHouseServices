import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const RectDropdown = () => {
  const options = ['one', 'two', 'three']
  return (
    <div>
      <Dropdown
        options={options}
        // value={defaultOption}
        placeholder="Select an option"
      />
      ;
    </div>
  )
}

export default RectDropdown
