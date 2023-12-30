export interface QueryHistory {
    title?: string | null,
    query: string,
    userId: string,
    server?: string | null,
    database?: string | null,
}