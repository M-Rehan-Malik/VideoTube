export class ApiError extends Error {
    constructor(
        public message: string = "Something went wrong",
        public status: number,
    ) {
        super(message);
        this.status = status;
        this.message = message;
    }
}