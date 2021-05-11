import React from "react"
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ApolloProvider } from "@apollo/client/react"
import Home from "./views/Home"
import Detail from "./views/Detail"
import Add from "./views/Add"
import client from "./graphql"

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={ client }>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ Home } />
          <Stack.Screen name="Detail" component={ Detail } />
          <Stack.Screen name="Add" component={ Add } />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  )
}