import { Request, Response } from "express";
import { ApiResponse } from "./ApiResponse";

export const asyncHandler = (fn: (req: Request, res: Response, next: () => void) => Promise<unknown>) =>
    async (req: Request, res: Response, next: () => void) => {
        try {
            console.log(req.body)
            await fn(req, res, next);
        } catch (error: any) {
            console.error("Error: ", error.details)
            res.status(error.status || 500).json(
                new ApiResponse<null>(
                    false,
                    null,
                    error.message || "Internal Server Error",
                )
            );
        }
    };

