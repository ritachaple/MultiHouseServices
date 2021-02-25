import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'

const Pagination = (props: any) => {
  const { pageLimit = 10, totalRecords, currentPage = 1 } = props

  const [totalPageCount, setTotalPageCount] = useState(0)
  // const [currentPage, setCurrentPage] = useState(1)

  const totalPages = () => {
    const noOfPages: number = Math.ceil(totalRecords / pageLimit)
    setTotalPageCount(noOfPages)
  }

  const onPageChanged = (operator: any) => {}

  // const [totalRecords, setTotalRecords] = useState()
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '25%',
          //   backgroundColor: 'pink',
          justifyContent: 'space-around',
        }}
      >
        <View>
          <Text>Rows Per Page</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>{pageLimit}</Text>
          <Icon style={{ paddingTop: '30%' }} name="angle-down" size={15} />
        </View>
        <View>
          <Text>1-10 of {totalRecords}</Text>
        </View>
        <View>
          <Icon
            name="angle-left"
            onPress={() => onPageChanged('-')}
            size={20}
          />
        </View>
        <View>
          <Text>{currentPage}</Text>
        </View>
        <View>
          <Icon
            name="angle-right"
            onPress={() => onPageChanged('+')}
            size={20}
          />
        </View>
      </View>
    </View>
  )
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  //   pageLimit: PropTypes.number,
  //   onPageChanged: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    paddingHorizontal: '3%',
    paddingVertical: '1%',
  },
})
export default Pagination
