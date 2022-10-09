import React,{useState} from 'react'

const SohanGajjar = ({setglobalArrays,globalarray}) => {
    
    const [currentArray, setcurrentArray] = useState('')
  
    function input(e){
      setcurrentArray('/' + e.target.value)
    }
  
    function submit(){
      setglobalArrays(oldArray => [...oldArray, currentArray])
    }
  return (
    <div><h1>You are {globalarray}</h1></div>
  )
}

export default SohanGajjar