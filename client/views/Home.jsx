import React from "react"
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import ShowTile from "../components/ShowTile"
import { useQuery, useReactiveVar } from "@apollo/client"
import { GET_MOVIES_AND_TVSERIES } from "../graphql/queries"
import displayHandler from "../helpers/displayHandler"
import { movieFavoritesVar, tvFavoritesVar } from "../graphql/variables"

export default function Home({ navigation }) {
  const allShows = useQuery(GET_MOVIES_AND_TVSERIES)
  const movieFavorites = useReactiveVar(movieFavoritesVar)
  const tvFavorites = useReactiveVar(tvFavoritesVar)

  function showTileCb(state, showType) {  
    return state.data[showType].map(show => {
      let favorites = []

      if(showType === "movies") {
        favorites = movieFavorites

      } else {
        favorites = tvFavorites
      }

      let isFavorited = favorites.some(favorite => favorite._id === show._id)

      return(
        <ShowTile
          { ...show }
          key = { show._id }
          navigation = { navigation }
          showType = { showType }
          isFavorited = { isFavorited }
        />  
      )
    })
  }

  let movieTiles = displayHandler(allShows, showTileCb, "movies")
  let tvTiles = displayHandler(allShows, showTileCb, "tvseries")

  return(
    <ScrollView style={ styles.mainContainer } contentContainerStyle= { styles.mainContainerContent}>
      <Text style={ styles.mainTitle }>Welcome to Popcorn Shows!</Text>

        <View style={ styles.showTypeContainer }>
          <Text style={ styles.subTitle }>Movies</Text>
          <View style={ styles.showTilesContainer }>
            { movieTiles }
          </View> 
        </View>

        <View style={ styles.showTypeContainer }>
          <Text style={ styles.subTitle }>Tv Series</Text>
          <View style={ styles.showTilesContainer }>
            { tvTiles }
          </View> 
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: "3%"
  },
  mainContainerContent: {
    alignItems: "center"
  },
  showTypeContainer: {
    paddingVertical: "5%",
    width: "100%"
  },  
  mainTitle: {
    paddingTop: 3,
    fontSize: 22,
    fontWeight: "bold"
  },  
  subTitle: {
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: "2%"
  },
  showTilesContainer: {
    flexWrap: "wrap",
    borderColor: "maroon",
    borderWidth: 2,
    flexDirection: "row"
  },
})