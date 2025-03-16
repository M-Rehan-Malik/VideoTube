import { app } from "./app";
import dotenv from "dotenv"
import { connectToDB } from "./db/connectToDB";
import { DB_NAME } from "./constants";

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT;

connectToDB(`${process.env.DB_URL}/${DB_NAME}`)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch(() => {
        process.exit(1)
    })