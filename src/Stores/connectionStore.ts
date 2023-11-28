import { autorun, makeAutoObservable } from "mobx";
import axiosAgents from "../api/axiosAgents";
import { SetConnectionInfo } from "../models/SetConnectionInfo";
import { toast } from "react-toastify";

export default class ConnectionStore {
    isLoading: boolean = false

    constructor() {
        makeAutoObservable(this)
        autorun(() => {

        })
    }

    setIsLoading = (value: boolean) => {
        this.isLoading = value
    }

    // retrieveDbConnection = async () => {
    //     this.setIsLoading(true)

    //     await axiosAgents.ConnectionActions.retrieveDbConnection()
    //         .then(response => {
    //             this.setServerList(response?.result)
    //         })
    //         .catch(() => {
    //             toast.error("Failed to retrieve default queries")
    //         })

    //     this.setIsLoading(false)
    // }

    setDbConnection = async (connectionInfo: SetConnectionInfo) => {
        this.setIsLoading(true)

        await axiosAgents.ConnectionActions.setDbConnection(connectionInfo)
            .then(() => {
                toast.success("Setup connection successfully")
            })
            .catch(() => {
                toast.error("Failed to setup connection")
            })

        this.setIsLoading(false)
    }
} 