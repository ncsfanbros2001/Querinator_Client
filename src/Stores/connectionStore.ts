import { autorun, makeAutoObservable, runInAction } from "mobx";
import axiosAgents from "../api/axiosAgents";
import { SetConnectionInfo } from "../models/SetConnectionInfo";
import { toast } from "react-toastify";
import { ServerAndDb } from "../models/ServerAndDb";
import { StaticValues } from "../utilities/Statics";

export default class ConnectionStore {
    isLoading: boolean = false;
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
        this.isLoading = value
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

    retrieveDatabases = async () => {
        this.setIsLoading(true)

        await axiosAgents.ConnectionActions.retrieveDatabases()
            .then(response => {
                this.setDatabases(response?.result)
            })
            .catch(() => {
                toast.error("Failed to retrieve default databases")
            })

        this.setIsLoading(false)
    }

    setDbConnection = async (connectionInfo: SetConnectionInfo) => {
        this.setIsLoading(true)

        await axiosAgents.ConnectionActions.setDbConnection(connectionInfo)
            .then((response) => {
                this.setCurrentServerAndDb({
                    server: response.result.serverName,
                    database: response.result.databaseName
                })

                toast.success("Setup connection successfully")
            })
            .catch(() => {
                toast.error("Failed to setup connection. Please verify that the name is correct")
            })

        this.setIsLoading(false)
    }

    retrieveCurrentServerAndDb = async () => {
        await axiosAgents.ConnectionActions.retrieveCurrentServerAndDb()
            .then(response => {
                this.setCurrentServerAndDb({
                    server: response.result.serverName,
                    database: response.result.databaseName
                })
            })
            .catch(() => {
                toast.error("Failed to retrieve current server and database")
            })
    }
} 