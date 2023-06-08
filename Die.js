import React from "react"

export default function Die(props){
    
    const change ={
        backgroundColor: props.dicehold ? "lightgreen" :"white"
    }
    return(
        <div className="swhite" style={change} onClick={props.handleClick}>
        <h1 className="h3v">{props.value}</h1></div>
    )
}