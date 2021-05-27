import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from "@react-native-picker/picker"
import { GET_MOVIES, GET_TVSERIES, GET_MOVIE_BYID, GET_TV_BYID } from "../graphql/queries"
import { ADD_MOVIE, ADD_TV, EDIT_MOVIE, EDIT_TV } from "../graphql/mutations"

export default function Form(props) {
  const [title, setTitle] = useState(props.title || "")
  const [showType, setShowType] = useState(props.showType || "movie")
  const [overview, setOverview] = useState(props.overview || "")
  const [poster_path, setPoster_path] = useState(props.poster_path || "")
  const [popularity, setPopularity] = useState(props.popularity ? props.popularity.toString() : "0")
  const [tags, setTags] = useState(props.tags || "")

  const [addMovie, { data: dataAddMovie }] = useMutation(ADD_MOVIE)
  const [addTv, { data: dataAddTv }] = useMutation(ADD_TV)
  const [editMovie, { data: dataEditMovie }] = useMutation(EDIT_MOVIE)
  const [editTv, { data: dataEditTv }] = useMutation(EDIT_TV)

  function submitForm() {
    let input = {
      _id: props._id,
      title,
      overview,
      poster_path,
      popularity: +popularity,
      tags
    }

    let refetchAction
    let submitAction

    if(showType === "movie") {
      refetchAction = [{ query: GET_MOVIES }]

      if(props.add) {
        submitAction = addMovie

      } else {
        submitAction = editMovie
        refetchAction.push({ query: GET_MOVIE_BYID, variables: { _id: props._id } })
      }

    } else {
      refetchAction = [{ query: GET_TVSERIES }]

      if(props.add) {
        submitAction = addTv

      } else {
        submitAction = editTv
        refetchAction.push({ query: GET_TV_BYID, variables: { _id: props._id } })
      }
    }

    submitAction({ 
      variables: input, 
      refetchQueries: refetchAction
    })
      .then(() => {
        if(props.updateLocals) {
          let favorites = props.updateLocals()
          let editedIndex = favorites.findIndex(favorite => favorite._id === input._id)
          let newFavorites = [...favorites]
          newFavorites[editedIndex] = input

          props.updateLocals(newFavorites)
        }
        props.navigation.goBack()
      })

      .catch(err => console.log(err))
  }


  return(
    <View style={ styles.formContainer }>
      <View style={ styles.formGroup }>
        <Text style={ styles.label }>Title:</Text>
        <TextInput style={ styles.input } onChangeText={ newTitle => setTitle(newTitle) } value={ title } />
      </View>

      { props.add &&
      <View style = { styles.formGroup }>
        <Text style={ styles.label } >Select show's type:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style = { styles.selectInput }
            itemStyle = { styles.optionItem }
            selectedValue = { showType }
            onValueChange = { newShowType => setShowType(newShowType) }
          >
            <Picker.Item label="Movie" value="movie" />
            <Picker.Item label="Tv Series" value="tv" />
          </Picker>
        </View>
      </View>
      }


      <View style={ styles.formGroup }>
        <Text style={ styles.label }>Overview:</Text>
        <TextInput 
          style = { styles.inputTextArea } 
          multiline = { true }
          numberOfLines = { 4 }
          onChangeText = { newOverview => setOverview(newOverview) } 
          value = { overview } 
        />
      </View>

      <View style={ styles.formGroup }>
        <Text style={ styles.label }>Poster URL:</Text>
        <TextInput style={ styles.input } onChangeText={ newPoster_path => setPoster_path(newPoster_path) } value={ poster_path } />
      </View>
 
      <View style={ styles.formGroup }>
        <Text style={ styles.label }>Popularity:</Text>
        <TextInput style={ styles.input } onChangeText={ newPopularity => setPopularity(newPopularity) } value={ popularity } />
      </View>
   
      <View style={ styles.formGroup }>
        <Text style={ styles.label }>Tags (separate by comma):</Text>
        <TextInput style={ styles.input } onChangeText={ newTags => setTags(newTags) } value={ tags }/>
      </View>

      <View style={ styles.buttonContainer }>
        <TouchableOpacity
          onPress = { () => submitForm() }
          style = { [styles.customButton, styles.okButton] }
        >
          <Text style={ styles.buttonText }>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress = { () => props.navigation.goBack() }
          style = { [styles.customButton, styles.cancelButton] }
        >
          <Text style={ styles.buttonText }>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
    width: "90%",
    justifyContent: "center",
    alignItems: "center"
  },

  formGroup: {
    alignItems: "center",
    width: "100%"
  },

  input: {
    height: 38,
    width: "80%",
    borderWidth: 2,
    paddingHorizontal: 10,
    borderColor: "maroon",
    textAlign: "center",
    backgroundColor: "cornsilk",
    fontSize: 18,
    marginTop: 8
  },

  inputTextArea: {
    width: "80%",
    borderWidth: 2,
    paddingHorizontal: 10,
    borderColor: "maroon",
    textAlign: "center",
    backgroundColor: "cornsilk",
    fontSize: 18,
    marginTop: 8
  },

  label: {
    marginTop: 32,
    fontSize: 16,
  },

  buttonContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  customButton: {
    marginTop: 38,
    width: "40%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6
  },

  okButton: {
    backgroundColor: "forestgreen",
  },

  cancelButton: {
    backgroundColor: "crimson",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold"
  },

  selectInput: {
    height: 38,
    fontSize: 16,
    width: "100%",
    backgroundColor: "cornsilk",
    textAlign: "center",
    color: "black"
  },

  pickerContainer: {
    marginTop: 18,
    height: 42,
    width: "80%",
    borderWidth: 2,
    borderColor: "maroon",
  },
})

