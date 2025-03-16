import mongoose, { ObjectId, Schema } from "mongoose"

export interface VideoInterface {
    _id?: string;
    video: string;
    thumbnail: string;
    owner: ObjectId;
    title: string;
    description: string;
    duration: number;
    views: number;
    isPublished: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const VideoSchema = new Schema<VideoInterface>({
    video: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    isPublished: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

export const VideoModel = mongoose.model("Video", VideoSchema);