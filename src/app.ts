import express, { Application } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { userRouter } from "./routes/User.route";

const app: Application = express();

app.use(cors({
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static("public"))

app.use('/api/user', userRouter);

export { app }