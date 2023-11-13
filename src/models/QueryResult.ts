import { HttpStatusCode } from "axios";

export interface QueryResult {
    isSuccess: boolean,
    result: any,
    errorMessages: string[],
    statusCode: HttpStatusCode
}