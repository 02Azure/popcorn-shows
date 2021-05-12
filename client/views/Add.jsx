import React from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { GET_MOVIES, GET_TVSERIES } from "../graphql/queries"
import { ADD_MOVIE, ADD_TV } from "../graphql/mutations"
import Form from "../components/ShowForm"

export default function Add({ route, navigation }) {
  const { show } = route.params

  return(
    <View>
      <Text>Ini halaman Add { show }</Text>
      <Form
        submitAction = { show === "movie" ? ADD_MOVIE : ADD_TV }
        refetchAction = { show === "movie" ? GET_MOVIES : GET_TVSERIES }
        navigation = { navigation } 
      />
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

