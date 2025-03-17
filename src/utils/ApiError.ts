export class ApiError extends Error {
    constructor(
        public message: string = "Something went wrong",
        public status: number,
        public details: string
    ) {
        super(message);
        this.details = details;
        this.status = status;
        this.message = message;
    }
}