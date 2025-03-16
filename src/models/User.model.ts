import mongoose, { ObjectId, Schema } from "mongoose"

export interface UserInterface {
    _id?: string;
    username: string;
    email: string;
    fullName: string;
    password: string;
    avatar: string;
    coverImage?: string;
    refreshToken: string;
    watchHistory: ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<UserInterface>({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    },
    refreshToken: {
        type: String,
        required: true
    },
    watchHistory: {
        type: [Schema.Types.ObjectId],
        ref: "Video",
        default: []
    }
}, {
    timestamps: true
});

export const UserModel = mongoose.model("User", UserSchema);