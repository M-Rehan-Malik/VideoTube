import mongoose, { ObjectId, Schema } from "mongoose"

export interface SubscriiptionInterface {
    _id?: string;
    subscriber: ObjectId;
    channel: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const SubscriptionSchema = new Schema<SubscriiptionInterface>({
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    channel: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

export const SubscriptionModel = mongoose.model("Subscription", SubscriptionSchema);