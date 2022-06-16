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

  const [ food, setFood ] = useState("...")

  async function fetchFood () {
    const response = await fetch(HOST+"random_food/")
    const data = await response.text()
    setFood(data) 
  }

  useEffect(
    ()=>{
      fetchFood()
    },
    []
  )

  return (
    <div className="wrapper">
      <h1>Hoy toca comer {food}.</h1>
    </div>
  )
}

export default App;
