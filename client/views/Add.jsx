import React from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { ADD_TV } from "../graphql/mutations"

export default function Add({ route }) {
  const { show } = route.params

  return(
    <View>
      <Text>Ini halaman Add { show }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tileContainer: {
    padding: 10,
    borderColor: "blue",
    borderWidth: 1,
    width: "20%",
    justifyContent: "space-between"
  }
})

