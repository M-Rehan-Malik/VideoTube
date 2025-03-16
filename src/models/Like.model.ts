import mongoose, { ObjectId, Schema } from "mongoose"

export interface LikeInterface {
    _id?: string;
    likedAt: ObjectId;
    owner: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const LikeSchema = new Schema<LikeInterface>({
    likedAt: {
        type: Schema.Types.ObjectId,
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

export const LikeModel = mongoose.model("Like", LikeSchema);