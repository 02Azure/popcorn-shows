import React from "react"
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

export default function AddButton({ navigation }) {
  return(
    <TouchableOpacity 
      style={ styles.addButton } 
      onPress={() => { navigation.navigate("Add") } }
    >
      <Text style={ styles.buttonText }> + New Show </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  addButton: {
    padding: 0,
    height: "100%",
    paddingRight: 8,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  }
})

