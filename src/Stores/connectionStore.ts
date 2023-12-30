import { makeAutoObservable, runInAction } from "mobx";
import axiosAgents from "../api/axiosAgents";
import { SetConnectionDTO } from "../DTOs/SetConnectionDTO";
import { toast } from "react-toastify";
import { ServerAndDb } from "../models/ServerAndDb";

export default class ConnectionStore {
    isConnectionLoading: boolean = false;
    servers: string[] = [];
    databases: string[] = [];
    currentServerAndDb: ServerAndDb = {
        server: '(N/A)',
        database: '(N/A)'
    }

    constructor() {
        makeAutoObservable(this)
    }

    setIsLoading = (value: boolean) => {
        this.isConnectionLoading = value
    }

    setServers = (value: string[]) => {
        this.servers = value
    }

    setDatabases = (value: string[]) => {
        this.databases = value
    }

    setCurrentServerAndDb = (value: ServerAndDb) => {
        runInAction(() => {
            this.currentServerAndDb = value
        })
    }

    retrieveServers = async () => {
        this.setIsLoading(true)

        await axiosAgents.ConnectionActions.retrieveServers()
            .then(response => {
                this.setServers(response?.result)
            })
            .catch(() => {
                toast.error("Failed to retrieve default servers")
            })

        this.setIsLoading(false)
    }

    retrieveDatabases = async (server: string) => {
        await axiosAgents.ConnectionActions.retrieveDatabases(server)
            .then(response => {
                this.setDatabases(response?.result)
            })
            .catch(() => {
                toast.error("Failed to retrieve default databases")
            })
    }

    setDbConnection = async (connectionInfo: SetConnectionDTO) => {
        this.setIsLoading(true)

        await axiosAgents.ConnectionActions.setDbConnection(connectionInfo)
            .then((response) => {
                this.setCurrentServerAndDb({
                    server: response.result.serverName,
                    database: response.result.databaseName
                })
                toast.success("Setup connection successfully")
            })
            .catch((error) => {
                toast.error(error?.response?.data?.errorMessage)
            })

        this.setIsLoading(false)
    }

    getCurrentServerAndDb = async (userId: string) => {
        this.setIsLoading(true)

        await axiosAgents.ConnectionActions.retrieveCurrentServerAndDb(userId)
            .then((response) => {
                if (response.result.serverName === null || response.result.databaseName === null) {
                    this.setCurrentServerAndDb({
                        server: '(N/A)',
                        database: '(N/A)'
                    })
                }
                else {
                    this.setCurrentServerAndDb({
                        server: response.result.serverName,
                        database: response.result.databaseName
                    })
                }
            })
            .catch((error) => {
                toast.error(error?.response?.data?.errorMessage)
            })

        this.setIsLoading(false)
    }
} 