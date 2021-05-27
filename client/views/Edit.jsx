import React from "react"
import { StyleSheet, Text, ScrollView } from 'react-native'
import { movieFavoritesVar, tvFavoritesVar } from "../graphql/variables"
import Form from "../components/ShowForm"

export default function Edit({ route, navigation }) {
  const { show, showType, isFavorited } = route.params

  return(
    <ScrollView contentContainerStyle={ styles.contentMainContainer } >
      <Text style={ styles.mainTitle }>Edit show</Text>
      <Form
        { ...show }
        showType = { showType }
        updateLocals = { isFavorited ? ( showType === "movie" ? movieFavoritesVar : tvFavoritesVar ) : undefined } //handle update favorite when server edited
        navigation = { navigation } 
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

