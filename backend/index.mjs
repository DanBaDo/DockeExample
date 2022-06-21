import express from "express"
import { config } from "dotenv"

import { dbAddRecipe, dbGetDishes, dbGetRandomRecipe } from "./db.mjs";
import { exceptionHandlerDecorator } from "./auxiliars.mjs";

const app = express()

if ( process.env.NODE_ENV != "production" ) {
    config()
}

const food = ["tortilla", "sopa", "ensalada", "aceitunas", "queso"]

app.use("/",express.static("../frontend/build/", {index: "index.html"}))

app.get("/random_food/",(req, res)=>{
    const randomIndex = Math.floor(Math.random()*(food.length-1))
    res.send(food[randomIndex])
})

<<<<<<< HEAD
app.get("/dishes/", async (req, res)=>{
    const dbResponse = await db.query(getDishesSQL)
    res.json(dbResponse.rows)
})

app.post("/dishes/", express.json(), async (req, res)=>{
    const dbResponse = await db.query(addDishesSQL, [req.body.url, req.body.dish])
    res.json(dbResponse)
=======
app.get("/dishes/random/", async (req, res)=>{
    res.json(
        //exceptionHandlerDecorator(
            (await dbGetRandomRecipe()).rows[0]//, res
        //)
    )
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
>>>>>>> a395e040801c50a5b4d7e383fcf3f70a973ae92e
})

app.listen( process.env.PORT, ()=> console.log(`Listening at ${process.env.PORT}`) )