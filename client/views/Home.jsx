import React from "react"
import { StyleSheet, Text, View } from 'react-native'
import ShowTile from "../components/ShowTile"
import { useQuery } from "@apollo/client"
import { GET_MOVIES, GET_TVSERIES } from "../graphql/queries"
import displayHandler from "../helpers/displayHandler"

export default function Home({ navigation }) {
  const movies = useQuery(GET_MOVIES)
  const tvseries = useQuery(GET_TVSERIES)

  function showTileCb(state) {
    let shows = Object.keys(state.data)[0]
    
    return state.data[shows].map(show => 
      <ShowTile
        { ...show }
        key = { show._id }
        navigation = { navigation }
        showType = { shows }
      />  
    )
  }

  let movieTiles = displayHandler(movies, showTileCb)
  let tvTiles = displayHandler(tvseries, showTileCb)

  return(
    <View>
      <Text>Welcome to Popcorn Shows!</Text>
      <Text onPress={ () => { navigation.navigate("Add", { show: "movie" } ) } }>Add new Movie</Text>
      <Text onPress={ () => { navigation.navigate("Add", { show: "tv" } ) } }>Add new Tv</Text>

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
    </View>
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