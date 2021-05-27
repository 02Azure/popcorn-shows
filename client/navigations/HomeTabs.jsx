import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from "@expo/vector-icons/Ionicons"
import Home from "../views/Home"
import Favorites from "../views/Favorites"

const Tab = createBottomTabNavigator()

export default function HomeStack({ navigation }) {
  return(
    <Tab.Navigator 
      tabBarOptions = {{ 
        activeBackgroundColor: "steelblue",
        inactiveBackgroundColor: "rgb(46, 81, 162)",
        activeTintColor: "gold",
        inactiveTintColor: "white",
        showLabel: false 
      }}
      >
      <Tab.Screen 
        name = "All Shows" 
        component = { Home } 
        options = {{ 
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name={ "apps" } color={ color } size={ size }/>
          },
        }}
      />
      <Tab.Screen 
        name = "Favorites" 
        component = { Favorites } 
        options = {{ 
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name={ "star" } color={ color } size={ size }/>
          },
        }}
      />
    </Tab.Navigator>
  )
}