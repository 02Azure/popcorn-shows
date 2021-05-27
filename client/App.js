import React from "react"
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ApolloProvider } from "@apollo/client/react"
import HomeTabs from "./navigations/HomeTabs"
import Detail from "./views/Detail"
import Add from "./views/Add"
import Edit from "./views/Edit"
import AddButton from "./components/AddButton"
import client from "./graphql"

const Stack = createStackNavigator()

export default function App() {
  return (
    <ApolloProvider client={ client }>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions = { ({ navigation }) => ({ 
            headerStyle: {
              backgroundColor: 'rgb(46, 81, 162)'
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold"
            },
            headerRight: () => <AddButton navigation={ navigation }/>,
          })} 
        >
          <Stack.Screen name = "Home" component = { HomeTabs }/>
          <Stack.Screen name="Detail" component={ Detail } />
          <Stack.Screen name="Add" component={ Add } options={ { headerRight: null } } />
          <Stack.Screen name="Edit" component={ Edit } />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}
