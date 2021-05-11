import React from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default function ShowTile({ _id, title, popularity, poster_path, navigation, showType }) {
  return(
    <TouchableOpacity style={ styles.tileContainer } onPress={() => { navigation.navigate("Detail", { _id, showType }) }}>
      <View style={ styles.imageContainer }>
        <Image
          style = { styles.movieImage }
          source = { { uri: poster_path } }
          defaultSource = { { uri: "https://reactnative.dev/img/tiny_logo.png" } }
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
    width: "20%",
    justifyContent: "space-between"
  },

  imageContainer: {
    marginBottom: 20
  },

  movieImage: {
    height: 75,
    width: 50,
    margin: "auto",
    borderColor: "black",
    borderWidth: 2
  },

  bottomPart: {
    backgroundColor: "yellow"
  },

  centerText: {
    textAlign: "center"
  }
})

