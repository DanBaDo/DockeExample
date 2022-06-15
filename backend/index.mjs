import express from "express"

const app = express()

const food = ["tortilla", "sopa", "ensalada", "aceitunas", "queso"]

app.use("/",express.static("../public", {index: "index.html"}))

app.get("/random_food/",(req, res)=>{
    const randomIndex = Math.floor(Math.random()*food.length-1)
    res.send(food[randomIndex])
})


app.listen(8080)