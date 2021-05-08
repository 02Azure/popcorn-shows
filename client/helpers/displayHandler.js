import React from "react"

export default function handleDisplay(state, onLoadCb) {
  if (state.loading) {
    return <p>Loading....</p>
  
  } else if(state.error) {
    return <p>Error :(</p>
  
  } else {
    return onLoadCb(state)
  }
}
