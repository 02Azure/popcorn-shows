import React from "react"
import { StyleSheet, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import { GET_MOVIES, GET_MOVIE_BYID, GET_TVSERIES, GET_TV_BYID } from "../graphql/queries"
import { EDIT_MOVIE, EDIT_TV } from "../graphql/mutations"
import Form from "../components/ShowForm"

export default function Edit({ route, navigation }) {
  const { show, showType } = route.params

  return(
    <ScrollView>
      <Text>Edit show</Text>
      <Form
        { ...show }
        submitAction = { showType === "movies" ? EDIT_MOVIE : EDIT_TV }
        refetchAction = 
          { showType === "movies" ? 
            [{ query: GET_MOVIES }, { query: GET_MOVIE_BYID, variables: { _id: show._id } }] : 
            [{ query: GET_TVSERIES }, { query: GET_TV_BYID, variables: { _id: show._id } }] 
          }
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

