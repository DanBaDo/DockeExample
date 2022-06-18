import { useEffect, useState } from "react"

import './App.css';

function App() {

  let HOST

  switch (window.location.hostname) {
    case "localhost":
      HOST="http://localhost:8080/"
      break;

    case "127.0.0.1":
      HOST="http://127.0.0.1:8080/"
      break;
      
    default:
      HOST="/"
      break;
  }

  const [ dishesList, setDishesList ] = useState([])
  const [ dish, setDish ] = useState("...")
  const [ url, setUrl ] = useState("")
  const [ showsForm, setShowsForm ] = useState(false)

  async function fetchDishesList () {
    const response = await fetch(HOST+"dishes/")
    const data = await response.json()
    setDishesList(data)
  }

  async function onChangeUrlInput (event) {
    if (event.target.validity.valid) setUrl(event.target.value)
  }

  async function onClickAddButton () {
    setShowsForm(!showsForm)
  }

  async function onFormSubmit (event) {
    event.preventDefault()
    setShowsForm(false)
    setUrl('')
    const form = new FormData(event.target)
    console.log( Object.fromEntries(form))
    
  }

  useEffect(
    ()=>{
      fetchDishesList()
    },
    []
  )

  useEffect(
    ()=>{
      const randomIndex = Math.floor(Math.random()*(dishesList.length-1))
      setDish(dishesList[randomIndex]?.dish)
    },
    [dishesList]
  )

  return (
    <div className="wrapper">
      <h1>Hoy toca comer {dish}.</h1>

      <form className={showsForm ? "show form" : "form"} onSubmit={onFormSubmit}>
        <input type={"url"} name="url" placeholder="write yout recipe URL" value={url} onChange={onChangeUrlInput}/>
        <input type={"submit"}/>
      </form>
      

      <button className="floating-button" onClick={onClickAddButton}>+</button>
    </div>
  )
}

export default App;
