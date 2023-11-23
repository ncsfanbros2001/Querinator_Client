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
            this.getDbConnection()
        })
    }

    setServerList = (value: ServerList[]) => {
        this.serverList = value
    }

    setIsLoading = (value: boolean) => {
        this.isLoading = value
    }

    getDbConnection = async () => {
        this.setIsLoading(true)

        await axiosAgents.ConnectionActions.getDbConnection()
            .then(response => {
                this.setServerList(response?.result)
            })
            .catch(() => {
                toast.error("Failed to retrieve default queries")
            })

        this.setIsLoading(false)
    }
} 