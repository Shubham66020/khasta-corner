class ApiResponse {
    constructor(statusCode, message = "Sucess", data) {
        this.statusCode = statusCode;
        this.message = ["success", message];
        this.data = data;
        this.success = statusCode < 400;
    }
}

export { ApiResponse };
