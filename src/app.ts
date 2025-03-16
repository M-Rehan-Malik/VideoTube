import express, { Application, Response } from "express"
import cors from "cors"

const app: Application = express();

app.use(cors())

app.get("/", (_, res: Response) => {
    res.send("Hello World")
})

export { app }