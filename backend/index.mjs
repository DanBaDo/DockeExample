import express from "express"
import { config } from "dotenv"

import { dbAddRecipe, dbGetDishes } from "./db.mjs";

if ( process.env.NODE_ENV != "production" ) config()

const app = express()

const food = ["tortilla", "sopa", "ensalada", "aceitunas", "queso"]

app.use("/",express.static("../frontend/build/", {index: "index.html"}))

app.get("/random_food/",(req, res)=>{
    const randomIndex = Math.floor(Math.random()*(food.length-1))
    res.send(food[randomIndex])
})

app.get("/dishes/", async (req, res)=>{
    try {
        const dbResponse = await dbGetDishes()
        res.json(dbResponse.rows)
    } catch (err) {
        console.error(err);
        res.sendStatus(500)
    }
})

app.post("/dishes/", express.json(), async (req, res)=>{
    try {
        const dbResponse = await dbAddRecipe([req.body.url, req.body.dish])
        res.json(dbResponse)
    } catch (err) {
        console.error(err);
        res.sendStatus(500)
    }
})

app.listen( process.env.PORT, ()=> console.log(`Listening at ${process.env.PORT}`) )