import React from "react"
import { StyleSheet, Text, ScrollView } from 'react-native'
import Form from "../components/ShowForm"

export default function Add({ navigation }) {
  return(
    <ScrollView contentContainerStyle={ styles.contentMainContainer }>
      <Text style={ styles.mainTitle }>Add a New Show</Text>
      <Form
        navigation = { navigation } 
        add = { true } 
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contentMainContainer: {
    alignItems: "center",
    paddingVertical: "2%"
  },

  mainTitle: {
    paddingTop: 3,
    fontSize: 22,
    fontWeight: "bold"
  },  
})

