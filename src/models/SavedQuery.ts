export interface SavedQuery {
    id?: string,
    title: string,
    query: string,
    server?: string | null,
    database?: string | null,
    userId: string
}