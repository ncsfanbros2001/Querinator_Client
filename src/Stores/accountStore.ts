import { autorun, makeAutoObservable } from "mobx";
import { LoginCredentials } from "../models/LoginCredentials";
import axiosAgents from "../api/axiosAgents";
import { toast } from "react-toastify";
import { LoggedInUser } from "../models/LoggedInUser";
import { StaticValues } from "../utilities/Statics";
import { RegisterInfo } from "../models/registerInfo";
import { jwtDecode } from "jwt-decode";
import { LoginResult } from "../models/LoginResult";
import { router } from "../Routes";

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

    setLoggedInUser = (value: LoggedInUser | null) => {
        this.loggedInUser = value;
    }

    login = async (loginCredentials: LoginCredentials) => {
        try {
            this.setIsLoading(true)

            localStorage.removeItem(StaticValues.userToken)
            const loginResult: LoginResult = await axiosAgents.AccountActions.login(loginCredentials)
            localStorage.setItem(StaticValues.userToken, loginResult.token)


            this.setIsLoading(false)
            window.location.replace("http://localhost:3000")

            toast.success("Login Successfully")
        }
        catch {
            toast.error("Incorrect Username or Password")
            this.setIsLoading(false)
        }
    }

    logout = async () => {
        localStorage.removeItem(StaticValues.userToken)
        this.setLoggedInUser(null)

        router.navigate('/')
    }

    register = async (registerInfo: RegisterInfo) => {
        try {
            this.setIsLoading(true)

            await axiosAgents.AccountActions.register(registerInfo)

            const loginResult: LoginResult = await axiosAgents.AccountActions.login({
                email: registerInfo.email,
                password: registerInfo.password
            })

            localStorage.setItem(StaticValues.userToken, loginResult.token)

            this.setIsLoading(false)
            window.location.replace("http://localhost:3000")

            await toast.success("Register Successfully")
        }
        catch (error) {
            console.log(error)
            this.setIsLoading(false)
        }
    }
}

