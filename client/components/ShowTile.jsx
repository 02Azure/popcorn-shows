import React, { useState } from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default function ShowTile({ _id, title, popularity, poster_path, navigation, showType }) {
  const [imageError, setImageError] = useState(false)
  
  return(
    <TouchableOpacity style={ styles.tileContainer } onPress={() => { navigation.navigate("Detail", { _id, showType }) }}>
      <View style={ styles.imageContainer }>
        <Image
          style = { styles.movieImage }
          source = { !imageError ? { uri: poster_path || "https://reactnative.dev/img/tiny_logo.png"  } : { uri: "https://reactnative.dev/img/tiny_logo.png" } }
          onError = { () => { setImageError(true) } }
          resizeMode = "contain"
        />
      </View>

      <View style = { styles.bottomPart }>
        <Text style = { styles.centerText }>{ title }</Text>
        <Text>{ popularity }</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tileContainer: {
    padding: 10,
    borderColor: "blue",
    borderWidth: 1,
    width: "33%",
  },

  imageContainer: {
    height: 130,
    marginBottom: 20,
    borderColor: "black",
    borderWidth: 2
  },

  movieImage: {
    height: "100%",
    width: "100%",
    margin: "auto"

  },

  bottomPart: {
    flex: 1,
    backgroundColor: "yellow",
    justifyContent: "space-between"
  },

  centerText: {
    textAlign: "center"
  }
})

