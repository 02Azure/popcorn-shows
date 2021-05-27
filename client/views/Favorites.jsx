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
    <ScrollView style={ styles.mainContainer } contentContainerStyle= { styles.mainContainerContent}>
      <Text style={ styles.mainTitle }>My Favorites</Text>

        <View style={ styles.showTypeContainer }>
          <Text style={ styles.subTitle }>Movies</Text>
          <View style={ styles.showTilesContainer }>
            { movieTiles.length ? movieTiles : 
              <Text>Whoops, looks like you don't have any favorite yet in this show's category</Text>
            }
          </View> 
        </View>

        <View style={ styles.showTypeContainer }>
          <Text style={ styles.subTitle }>Tv Series</Text>
          <View style={ styles.showTilesContainer }>
            { tvTiles.length ? tvTiles :
              <Text>Whoops, looks like you don't have any favorite yet in this show's category</Text>
            }
          </View> 
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: "3%",
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