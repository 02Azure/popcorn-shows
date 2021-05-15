import React from "react"
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import { GET_MOVIES, GET_TVSERIES } from "../graphql/queries"
import { ADD_MOVIE, ADD_TV } from "../graphql/mutations"
import Form from "../components/ShowForm"

export default function Add({ route, navigation }) {
  const { show } = route.params

  return(
    <ScrollView>
      <Text>Add new { show }</Text>
      <Form
        submitAction = { show === "movie" ? ADD_MOVIE : ADD_TV }
        refetchAction = { show === "movie" ? [{ query: GET_MOVIES }] : [{ query: GET_TVSERIES }] }
        navigation = { navigation } 
      />
    </ScrollView>
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

