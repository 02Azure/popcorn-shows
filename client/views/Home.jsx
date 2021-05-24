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
    <ScrollView>
      <Text>Welcome to Popcorn Shows!</Text>
      <Text onPress={ () => { navigation.navigate("Add", { show: "movie" } ) } }>Add new Movie</Text>
      <Text onPress={ () => { navigation.navigate("Add", { show: "tv" } ) } }>Add new Tv</Text>
      <Text onPress={ () => { navigation.navigate("Favorites") } }>My Favorites</Text>

        <View>
          <Text>Movies</Text>
          <View style={ styles.showTilesContainer }>
            { movieTiles }
          </View> 
        </View>

        <View>
          <Text>Tv Series</Text>
          <View style={ styles.showTilesContainer }>
            { tvTiles }
          </View> 
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  showTilesContainer: {
    flexWrap: "wrap",
    borderColor: "red",
    borderWidth: 2,
    flexDirection: "row"
  },
})