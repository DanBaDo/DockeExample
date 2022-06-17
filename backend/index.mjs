import express from "express"
import { config } from "dotenv"

import { db, getDishesSQL, addDishesSQL } from "./db.mjs"

if ( process.env.NODE_ENV != "production" ) config()

const app = express()

const food = ["tortilla", "sopa", "ensalada", "aceitunas", "queso"]

app.use("/",express.static("../frontend/build/", {index: "index.html"}))

app.get("/random_food/",(req, res)=>{
    const randomIndex = Math.floor(Math.random()*(food.length-1))
    res.send(food[randomIndex])
})

app.get("/dishes/", async (req, res)=>{
    const dbResponse = await db.query(getDishesSQL)
    res.json(dbResponse.rows)
})

app.post("/dishes/", express.json(), async (req, res)=>{
    const dbResponse = await db.query(addDishesSQL, [req.body.url, req.body.dish])
    res.json(dbResponse)
})

app.listen( process.env.PORT, ()=> console.log(`Listening at ${process.env.PORT}`) )