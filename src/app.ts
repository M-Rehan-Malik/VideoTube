import express, { Application } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { userRouter } from "./routes/User.route";
import { videoRouter } from "./routes/Video.route";
import { tweetRouter } from "./routes/Tweet.route";
import { subscriptionRouter } from "./routes/Subscription.route";
import { playlistRouter } from "./routes/Playlist.route";
import { likeRouter } from "./routes/Like.route";
import { commentRouter } from "./routes/Comment.route";

const app: Application = express();

app.use(cors({
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static("public"))

app.use('/api/user', userRouter);
app.use('/api/video', videoRouter);
app.use('/api/tweet', tweetRouter);
app.use('/api/subscription', subscriptionRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/like', likeRouter);
app.use('/api/comment', commentRouter);

export { app }