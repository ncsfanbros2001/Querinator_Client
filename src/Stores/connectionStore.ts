import { autorun, makeAutoObservable } from "mobx";
import axiosAgents from "../api/axiosAgents";
import { ServerList } from "../models/ServerList";
import { toast } from "react-toastify";

export default class ConnectionStore {
    serverList: ServerList[] = []
    isLoading: boolean = false

    constructor() {
        makeAutoObservable(this)
        autorun(() => {
            this.retrieveDbConnection()
        })
    }

    setServerList = (value: ServerList[]) => {
        this.serverList = value
    }

    setIsLoading = (value: boolean) => {
        this.isLoading = value
    }

    retrieveDbConnection = async () => {
        this.setIsLoading(true)

        await axiosAgents.ConnectionActions.retrieveDbConnection()
            .then(response => {
                this.setServerList(response?.result)
            })
            .catch(() => {
                toast.error("Failed to retrieve default queries")
            })

        this.setIsLoading(false)
    }

    setDbConnection = async (serverName: string, databaseName: string) => {
        this.setIsLoading(true)

        await axiosAgents.ConnectionActions.setDbConnection(serverName, databaseName)
            .then(() => {
                toast.success("Setup connection successfully")
            })
            .catch(() => {
                toast.error("Failed to setup connection")
            })

        this.setIsLoading(false)
    }
} 