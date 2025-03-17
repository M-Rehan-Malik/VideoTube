export class ApiResponse<T> {
    constructor(
        public success: boolean,
        public data: T,
        public message: string
    ) {
        this.success = success;
        this.data = data;
        this.message = message;
    }
}