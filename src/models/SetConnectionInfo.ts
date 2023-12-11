export interface SetConnectionInfo {
    serverName: string,
    databaseName: string,
    username?: string,
    password?: string,
    requiresCredentials: boolean
}