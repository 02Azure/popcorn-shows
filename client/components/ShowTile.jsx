import React, { useState } from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default function ShowTile({ _id, title, popularity, poster_path, navigation, showType, isFavorited }) {
  const [imageError, setImageError] = useState(false)
  
  return(
    <TouchableOpacity style={ styles.tileContainer } onPress={() => { navigation.navigate("Detail", { _id, showType, isFavorited }) }}>
      <View style={ styles.imageContainer }>
        <Image
          style = { styles.movieImage }
          source = { !imageError ? { uri: poster_path || "https://reactnative.dev/img/tiny_logo.png"  } : { uri: "https://reactnative.dev/img/tiny_logo.png" } }
          onError = { () => { setImageError(true) } }
          resizeMode = "contain"
        />
      </View>

      <View style = { styles.bottomPart }>
        <Text style = { styles.title }>{ title }</Text>
        <Text style = { styles.popularity }>{ popularity }</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tileContainer: {
    padding: 10,
    width: "33%",

  },

  imageContainer: {
    borderColor: "gray",
    borderWidth: 2,
    height: 130,
    marginBottom: 20,
  },

  movieImage: {
    height: "100%",
    width: "100%",
    margin: "auto"

  },

  bottomPart: {
    flex: 1,
    justifyContent: "space-between"
  },

  title: {
    textAlign: "center",
    fontWeight: "bold"
  },

  popularity: {
    textAlign: "center",
    fontWeight: "bold",
    color: "rgb(46, 81, 162)"
  }
})

