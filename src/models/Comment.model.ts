import mongoose, { ObjectId, Schema } from "mongoose"

export interface CommentInterface {
    _id?: string;
    content: string;
    video: ObjectId;
    owner: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const CommentSchema = new Schema<CommentInterface>({
    content: {
        type: String,
        required: true
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video",
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

export const CommentModel = mongoose.model("Comment", CommentSchema);