import mongoose, { ObjectId, Schema } from "mongoose"

export interface TweetInterface {
    _id?: string;
    content: string;
    owner: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const TweetSchema = new Schema<TweetInterface>({
    content: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

export const TweetModel = mongoose.model("Tweet", TweetSchema);