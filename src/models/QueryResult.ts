import { HttpStatusCode } from "axios";

export interface QueryResult {
    isSuccess: boolean,
    result: any,
    errorMessage: string,
    statusCode: HttpStatusCode
}