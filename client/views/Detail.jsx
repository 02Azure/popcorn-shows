import { useQuery, useMutation } from "@apollo/client"
import React, { useState } from "react"
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import { GET_MOVIE_BYID, GET_TV_BYID, GET_MOVIES, GET_TVSERIES } from "../graphql/queries"
import { DELETE_MOVIE, DELETE_TV } from "../graphql/mutations"
import { movieFavoritesVar, tvFavoritesVar } from "../graphql/variables"
import displayHandler from "../helpers/displayHandler"
const win = Dimensions.get("window")

export default function Detail({ route, navigation }) {
  const { _id, showType } = route.params
  let favoritesVar 

  if(showType === "movies") {
    favoritesVar = movieFavoritesVar

  } else {
    favoritesVar = tvFavoritesVar
  }

  let favorites = favoritesVar()


  const [imageError, setImageError] = useState(false)
  const [isFavorited, setIsFavorited] = useState(route.params.isFavorited)

  const show = showType === "movies" ? 
    useQuery(GET_MOVIE_BYID, { variables: { _id } }) : 
    useQuery(GET_TV_BYID, { variables: { _id } })

  const [deleteShow, { data }] = showType === "movies" ? useMutation(DELETE_MOVIE) : useMutation(DELETE_TV)

  function handleFavorites() {
    if(isFavorited) {
      let deletedIndex = favorites.findIndex(favorite => favorite._id === _id)
      let newFavorites = [...favorites]
      newFavorites.splice(deletedIndex, 1)

      favoritesVar(newFavorites)
      setIsFavorited(false)

    } else {
      let newFavorites = [...favorites, show.data[Object.keys(show.data)[0]]]

      favoritesVar(newFavorites)
      setIsFavorited(true)
    }
  }

  function deleteThisShow() {
    deleteShow({
      variables: {
        _id
      },
      refetchQueries: showType === "movies" ? [{ query: GET_MOVIES }] : [{ query: GET_TVSERIES }]
    })

      .then(() => {
        let deletedIndex = favorites.findIndex(favorite => favorite._id === _id)
        let newFavorites = [...favorites]
        newFavorites.splice(deletedIndex, 1)
        favoritesVar(newFavorites)

        navigation.goBack()
      })

      .catch(err => console.log(err))
  }

  function showDetailBox(state) {
    let showDetail = Object.keys(state.data)[0]
    let { poster_path, title, overview, popularity, tags } = state.data[showDetail]

    return(
      <>
        <View>
          <Image
            style = { styles.movieImage }
            source = { !imageError ? { uri: poster_path || "https://reactnative.dev/img/tiny_logo.png" } : { uri: "https://reactnative.dev/img/tiny_logo.png" } }
            resizeMode = "contain"
            onError = { () => { setImageError(true) } }
          />
        </View>

        <View style={ styles.detailContainer }>
          <Text style={ styles.movieTitle }>{ title }</Text>
          <Text style={ styles.movieOverview }>{ overview }</Text>
          <Text>Popularity: { popularity } / 10</Text>
          <Text style={ styles.movieTags}>Tags: { tags.join(", ") }</Text>

          <View style={ styles.buttonContainer }>
            <TouchableOpacity
              onPress = { () => navigation.navigate("Edit", { showType, show: { _id, poster_path, title, overview, popularity, tags: tags.join(",") }, isFavorited }) }
              style = { [styles.customButton, styles.editButton] }
            >
              <Text style={ styles.buttonText }>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress = { () => deleteThisShow() }
              style = { [styles.customButton, styles.cancelButton] }
            >
              <Text style={ styles.buttonText }>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress = { () => handleFavorites() }
              style = { [styles.customButton, styles.okButton] }
            >
              <Text style={ styles.buttonText }>{ isFavorited ? "Unfavorite" : "Favorite" }</Text>
            </TouchableOpacity>
          </View>

        </View>
      </>
    )
  }

  let detailContent = displayHandler(show, showDetailBox)

  return(
    <View style={ styles.detailPage }>
      { detailContent }
    </View>
  )
}

const styles = StyleSheet.create({
  detailPage: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    backgroundColor: "green"
  },

  detailContainer: {
    width: "100%",
    backgroundColor: "pink",
  }, 

  movieImage: {
    height: win.height * 0.4,
    width: win.height * 0.8 / 3,
    margin: "auto",
    borderColor: "black",
    borderWidth: 2
  },

  movieTitle: {
    fontWeight: "bold",
    fontSize: 20
  },

  movieOverview: {
    textAlign: "justify",
    fontStyle: "italic"
  },

  movieTags: {
    fontWeight: "bold"
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  customButton: {
    marginTop: 38,
    width: "30%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6
  },

  okButton: {
    backgroundColor: "dodgerblue"
  },

  editButton: {
    backgroundColor: "orange",
  },

  cancelButton: {
    backgroundColor: "crimson",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
})

