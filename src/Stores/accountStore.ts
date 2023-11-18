import { makeAutoObservable } from "mobx";
import { LoginCredentials } from "../models/LoginCredentials";
import axiosAgents from "../api/axiosAgents";
import { toast } from "react-toastify";
import { LoggedInUser } from "../models/LoggedInUser";
import { StaticValues } from "../utilities/Statics";
import { RegisterInfo } from "../models/RegisterInfo";

export default class AccountStore {
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    setIsLoading = (value: boolean) => {
        this.isLoading = value;
    }

    login = async (loginCredentials: LoginCredentials) => {
        try {
            this.setIsLoading(true)

            localStorage.removeItem(StaticValues.userToken)
            const loggedInUser: LoggedInUser = await axiosAgents.AccountActions.login(loginCredentials)
            localStorage.setItem(StaticValues.userToken, loggedInUser.token)

            this.setIsLoading(false)

            toast.success("Login Successfully")
            window.location.replace("http://localhost:3000")
        }
        catch {
            toast.error("Incorrect Username or Password")
            this.setIsLoading(false)
        }
    }

    register = async (registerInfo: RegisterInfo) => {
        try {
            this.setIsLoading(true)

            const loggedInUser: LoggedInUser = await axiosAgents.AccountActions.register(registerInfo)

            this.setIsLoading(true)
        }
        catch {

        }
    }
}