import { VideoInterface, VideoModel } from "../../models/Video.model";
import { publishVideoSchema } from "../../schemas/Video/publishVideo.schema";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { uploadToCloudinary } from "../../utils/cloudinary";
import { getVideoDurationInSeconds } from "get-video-duration"


export const publishVideoController = asyncHandler(async (req, res) => {
    const credentials = req.body;

    const validationResult = publishVideoSchema.safeParse(credentials);

    if (!validationResult.success) {
        throw new ApiError(
            validationResult.error.errors[0].message,
            400
        )
    }

    const { title, description, isPublished } = validationResult.data;

    const files = req.files as {
        video?: Express.Multer.File[],
        thumbnail?: Express.Multer.File[]
    };

    if (!files.video || !files.thumbnail) {
        throw new ApiError(
            "Video and thumbnail are required",
            400
        )
    }

    const video = files.video[0];
    const thumbnail = files.thumbnail[0];

    const videoPath = video.path;
    const thumbnailPath = thumbnail.path;

    const videoDuration = Number((await getVideoDurationInSeconds(videoPath)).toFixed(0))

    const uploadedVideo = await uploadToCloudinary(videoPath);
    const uploadedThumbnail = await uploadToCloudinary(thumbnailPath);

    if (!uploadedVideo || !uploadedThumbnail) {
        throw new ApiError(
            "Failed to upload video or thumbnail",
            500
        )
    }

    const videoURL = uploadedVideo.secure_url;
    const thumbnailURL = uploadedThumbnail.secure_url;

    const createdVideo = await VideoModel.create({
        video: videoURL,
        thumbnail: thumbnailURL,
        owner: (req as AuthenticatedRequest)?.user?._id,
        title,
        description,
        duration: videoDuration,
        views: 0,
        isPublished
    });

    if (!createdVideo) {
        throw new ApiError(
            "Failed to create video",
            500
        )
    }

    return res.status(200)
        .json(
            new ApiResponse<VideoInterface>(
                true,
                createdVideo,
                "Video created successfully"
            )
        )
})