import { autorun, makeAutoObservable, reaction } from "mobx";
import { LoginCredentials } from "../models/LoginCredentials";
import axiosAgents from "../api/axiosAgents";
import { toast } from "react-toastify";
import { LoggedInUser } from "../models/LoggedInUser";
import { StaticValues } from "../utilities/Statics";
import { RegisterInfo } from "../models/registerInfo";
import { jwtDecode } from "jwt-decode";

export default class AccountStore {
    isLoading: boolean = false;
    userToken: string | null = localStorage.getItem(StaticValues.userToken)
    loggedInUser: LoggedInUser | null = null

    constructor() {
        makeAutoObservable(this)

        autorun(() => {
            if (this.userToken) {
                this.loggedInUser = jwtDecode(this.userToken)
            }
        })
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

            //const loggedInUser: LoggedInUser = await axiosAgents.AccountActions.register(registerInfo)
            // console.log(registerInfo)

            this.setIsLoading(true)
        }
        catch (error) {
            console.log(error)
            this.setIsLoading(false)
        }
    }
}

