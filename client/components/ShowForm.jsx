import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'

export default function Form(props) {
  const [title, setTitle] = useState(props.title || "")
  const [overview, setOverview] = useState(props.overview || "")
  const [poster_path, setPoster_path] = useState(props.poster_path || "")
  const [popularity, setPopularity] = useState(props.popularity || 0)
  const [tags, setTags] = useState(props.tags || "")
  const [submitAction, { data }] = useMutation(props.submitAction)

  function submitForm() {
    let input = {
      _id: props._id,
      title,
      overview,
      poster_path,
      popularity: +popularity,
      tags
    }

    submitAction({ 
      variables: input, 
      refetchQueries: props.refetchAction
    })
      .then(() => {
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
    borderColor: "blue",
    borderWidth: 1,
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
})

