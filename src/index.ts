import { app } from "./app";
import dotenv from "dotenv"
import { connectToDB } from "./db/connectToDB";
import { DB_NAME } from "./constants";

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT || 3000;

connectToDB(`${process.env.DB_URL}/${DB_NAME}`)
    .then(() => {
        console.log("Connected to DB")
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`)
        })
    })
    .catch((err) => {
        console.error("Failed to connect to DB", err)
        process.exit(1)
    })