import { useEffect, useState } from "react"
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/big-smile';

import './App.css';

let avatar = createAvatar(style, {
  seed: btoa(Date.now()),
  flip: true,
  dataUri: true,
});

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

  const [ recipe, setRecipeState ] = useState()
  const [ dish, setDishState ] = useState("...")
  const [ url, setUrlState ] = useState("")
  const [ showsForm, setShowsFormState ] = useState(false)

  async function getRandomRecipe () {
    const response = await fetch(HOST+"dishes/random/")
    const data = await response.json()
    setRecipeState(data)
    setDishState(data.dish)
    setUrlState(data.url)
  }

  async function onChangeUrlInput (event) {
    setUrlState(event.target.value)
  }

  async function onChangeDishInput (event) {
    setDishState(event.target.value)
  }

  async function onClickAddButton () {
    setShowsFormState(!showsForm)
  }

  async function onFormSubmit (event) {
    event.preventDefault()
    setShowsFormState(false)
    setUrlState('')
    const form = new FormData(event.target)
    fetch(HOST+"dishes/",{
      method: "POST",
      body: JSON.stringify(Object.fromEntries(form)),
      headers: {
        "Content-Type": "application/json"
      }
    })
    
  }

  async function floatingButtonClickHandler (event) {
    console.log("...");
    setShowsFormState(!showsForm)
  }

  async function submitHandler (event) {
    console.log("...");
  }

  useEffect(
    ()=>{
      getRandomRecipe()
    },
    []
  )

  return (
    <div className="wrapper">

      <img className={"avatar"} src={avatar} alt="User avatar"/>
      
      <h1>Hoy toca comer {dish}.</h1>

      {/* TODO: use https://www.npmjs.com/package/link-preview-js */}
      <iframe width="300" height="200" src={url}/>

      <form className={showsForm ? "show form" : "form"} onSubmit={onFormSubmit}>
        <input type={"text"} name="dish" placeholder="write a dish" value={dish} onChange={onChangeDishInput}/>
        <input type={"url"} name="url" placeholder="write yout recipe URL" value={url} onChange={onChangeUrlInput}/>
        <input type={"submit"}/>
      </form>
      
      <button className="floating-button" onClick={onClickAddButton}>+</button>

    </div>
  )
}

export default App;
