import React from "react"
import { StyleSheet, Text, View } from 'react-native'

export default function ShowTile({ title, popularity, poster_path }) {
  return(
    <View style={ styles.tileContainer }>
      <Text>{ poster_path }</Text>
      <Text>{ title }</Text>
      <Text>{ popularity }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tileContainer: {
    borderColor: "blue",
    borderWidth: 1
  },
})

