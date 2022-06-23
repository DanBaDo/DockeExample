import express from "express"
import { config } from "dotenv"
import aws from "aws-sdk"

import { dbAddRecipe, dbGetRandomRecipe } from "./db.mjs";

const app = express()

if ( process.env.NODE_ENV != "production" ) {
    config()
}

app.use("/",express.static("../frontend/build/", {index: "index.html"}))

app.get("/dishes/random/", async (req, res)=>{
    res.json(
        (await dbGetRandomRecipe()).rows[0]
    )
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

app.post("/upload/:fileId", async (req, res)=>{
    try {

        const s3 = new aws.S3({
            endpoint: process.env.S3_ENDPOINT,
            s3ForcePathStyle: true,
            signatureVersion: process.env.S3_SIGNATURE_VERSION,
        });

        const s3Response = s3.upload({
            Bucket: process.env.S3_BUCKET,
            Key: req.params.fileId,
            Body: req,
            ContentType: req.headers['content-type'],
            ContentLength: req.headers['content-length'],
        })

        const data = await s3Response.promise()
        console.log(data);

        res.sendStatus(201)


    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

// var fileStream = s3.getObject(options).createReadStream();

app.listen( process.env.PORT, ()=> console.log(`Listening at ${process.env.PORT}`) )