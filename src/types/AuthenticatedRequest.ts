import { Request } from "express";
import { UserInterface } from "../models/User.model";

export interface AuthenticatedRequest extends Request {
    user?: UserInterface;
}