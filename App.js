import React from "react"
import ReactDOM from "react-dom"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App(){    
    
    function generate(){
        return Math.floor(Math.random() * 6)+1
    }
    
    function generateArray(){
        const newArray = []
        for(let i=1; i<=10; i++){
            newArray.push(toFinish())
        }
        return newArray
    }
    
    const [numbers, setNumbers] = React.useState(generateArray())
    const [tenzies,setTenzies] = React.useState(false)
    
    const ncollect = numbers.map(number => <Die value={number.value} 
    key={number.id} dicehold={number.dicehold} 
    handleClick={() => clickDice(number.id)}/>)
    
    function rollBtn(){
        if (!tenzies){
        setNumbers(numbers => numbers.map(number => {
          return   number.dicehold ? number : toFinish()
        }))}else{
            setTenzies(false)
            setNumbers(generateArray())
        }
    }
    
    function clickDice(id){        
        setNumbers(numbers => numbers.map(number =>
            id===number.id ? {...number,dicehold: !number.dicehold} : number
            ))
    }
    
    function toFinish(){
        return {
            value: Math.floor(Math.random() * 6)+1,//Math.ceil(Math.random() * 6),
            dicehold: false,
            id: nanoid()
        }
    }
    
    React.useEffect(
        ()=> {const diceheld = numbers.every(number=> number.dicehold)
        const valueOne = numbers[0].value
        const allValues = numbers.every(number=>number.value===valueOne)
        if(diceheld&&allValues){
            setTenzies(true)            
            console.log("You won!")
        }}
        ,[numbers])   
    
    return(        
        <div className="bwhite">
        {tenzies && <Confetti />}
        <h1 className="ten">Tenzies</h1>
        <h5 className="h4r">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</h5>
        <div className="col">{ncollect}</div>
        <div className="rolb">
        <button className="btn" onClick={rollBtn}>
        {tenzies?"New Game":"Roll"} </button>
        </div></div>
    )
}