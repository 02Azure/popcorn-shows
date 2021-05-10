import { useQuery } from "@apollo/client"
import React from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { GET_MOVIE_BYID, GET_TV_BYID } from "../graphql/queries"
import displayHandler from "../helpers/displayHandler"

export default function Detail({ route }) {
  const { _id, showType } = route.params
  const show = showType === "movie" ? useQuery(GET_MOVIE_BYID) : useQuery(GET_TV_BYID)

  function showDetailBox(state) {
    let showDetail = Object.keys(state.data)[0]

    return(
      <>
        <Text>{ state.data[showDetail].poster_path }</Text>
        <Text>{ state.data[showDetail].title }</Text>
        <Text>{ state.data[showDetail].overview }</Text>
        <Text>{ state.data[showDetail].popularity }</Text>
        <Text>Tags: { state.data[showDetail].tags.join(", ") }</Text>
      </>
    )
  }

  let detailContent = displayHandler(show, showDetailBox)

  return(
    <View>
      { detailContent }
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

