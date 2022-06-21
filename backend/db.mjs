import pg from "pg";
import { config } from "dotenv";

if (process.env.NODE_ENV !== 'production') config();

const createRecipesTableSQL = `
    CREATE TABLE IF NOT EXISTS recipes (
        id SERIAL PRIMARY KEY,
        url VARCHAR(500),
        dish VARCHAR(50)
    )
`

const addRecipeSQL = `
    INSERT INTO recipes(url, dish) VALUES ($1, $2)
`

const getDishesSQL = `
    SELECT DISTINCT dish FROM recipes 
`

const getTotalNumberOfRecipesSQL = `
    SELECT COUNT(*) FROM recipes
`

const getRandomRecipeSQL = `
    SELECT * FROM recipes ORDER BY RANDOM() LIMIT 1
`

const db = new pg.Client(process.env.PG_URL)
db.connect()

export function dbQueryFactory ( sql ) {
    return async function ( args = [] ) {
        const dbResponse = await db.query(sql, args)
        return dbResponse
    }
}

export const dbCreateTables = dbQueryFactory(createRecipesTableSQL)

export const dbAddRecipe = dbQueryFactory(addRecipeSQL)

export const dbGetTotalNumberOfRecipes = dbQueryFactory(getTotalNumberOfRecipesSQL)

export const dbGetDishes = dbQueryFactory(getDishesSQL)

export const dbGetRandomRecipe = dbQueryFactory(getRandomRecipeSQL)

try {
    dbCreateTables()
} catch (error) {
    console.error("Error trying to create tables")
    throw error
}