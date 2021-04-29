import React, { useState, useCallback, useEffect } from 'react'
import { View, Text } from 'react-native'
// @ts-ignore
import LoadingBar from 'react-top-loading-bar'

const Loader = (props: any) => {
  const { progres } = props
  const [progress, setProgress] = useState(progres)
  // const [progress, setProgress] = useState(10)

  // useCallback(
  //     () => {
  //         setProgress(progres)
  //     },
  //     [progres],
  // )

  useEffect(() => {
    setProgress(progres)

    // return () => {
    //     cleanup
    // }
  }, [progres])

  return (
    <LoadingBar
      // transitionTime={10000}
      // loaderSpeed={1}
      // waitingTime={100}
      color="#001163"
      progress={progress}
      onLoaderFinished={() => setProgress(100)}
    />
  )
}

export default Loader
