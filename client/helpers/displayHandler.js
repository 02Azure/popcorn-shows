import React from "react"
import { Text } from 'react-native'

export default function handleDisplay(state, onLoadCb, cbInput) {
  if (state.loading) {
    return <Text>Loading....</Text>
  
  } else if(state.error) {
    return <Text>Error :(</Text>
  
  } else {
    return onLoadCb(state, cbInput)
  }
}
