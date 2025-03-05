export default class UserNotFoundError extends Error {
    constructor(query: any, options?: ErrorOptions) {
        super("User not found: " + query, options);
    }
}