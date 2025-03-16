import mongoose, { ObjectId, Schema } from "mongoose"

export interface PlaylistInterface {
    _id?: string;
    name: string;
    description: string;
    videos: ObjectId[];
    owner: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const PlaylistSchema = new Schema<PlaylistInterface>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videos: {
        type: [Schema.Types.ObjectId],
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

export const PlaylistModel = mongoose.model("Playlist", PlaylistSchema);