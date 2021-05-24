import React from "react"
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useReactiveVar } from "@apollo/client"
import ShowTile from "../components/ShowTile"
import { movieFavoritesVar, tvFavoritesVar } from "../graphql/variables"

export default function Home({ navigation }) {
  const movieFavorites = useReactiveVar(movieFavoritesVar)
  const tvFavorites = useReactiveVar(tvFavoritesVar)

  console.log(movieFavorites)
  let movieTiles = movieFavorites.map(movie => 
    <ShowTile
      { ...movie }
      key = { "fav" + movie._id }
      navigation = { navigation }
      showType = { "movies" }
      isFavorited = { true }
    />  
  )

  let tvTiles = tvFavorites.map(tv => 
    <ShowTile
      { ...tv }
      key = { "fav" + tv._id }
      navigation = { navigation }
      showType = { "tv" }
      isFavorited = { true }
    />  
  )

  return(
    <ScrollView>
      <Text>My Favorites</Text>

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