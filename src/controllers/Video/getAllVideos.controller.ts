import { VideoInterface, VideoModel } from "../../models/Video.model";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";


export const getAllVideosController = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query = "", sortBy = "createdAt", sortType = 1 }: {
        page?: number,
        limit?: number,
        query?: string,
        sortBy?: string,
        sortType?: 1 | -1
    } = req.query

    const videos = (await VideoModel.aggregate<VideoInterface>([
        {
            $match: {
                title: {
                    $regex: query,
                    $options: "i"
                },
                isPublished: true
            }
        },
        {
            $sort: {
                [sortBy]: sortType
            }
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $limit: limit
        }  
    ]));

    if (!videos || !videos.length) {
        throw new ApiError(
            "No videos found",
            404
        )
    }

    return res.status(200)
    .json(
        new ApiResponse<VideoInterface[]>(
            true,
            videos,
            "Fetched all videos successfully"
        )
    )
})