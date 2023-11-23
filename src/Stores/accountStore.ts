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
    errors: string[] = []

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
        this.setIsLoading(true)

        localStorage.removeItem(StaticValues.userToken)

        await axiosAgents.AccountActions.login(loginCredentials)
            .then((response: LoginResult) => {
                localStorage.setItem(StaticValues.userToken, response?.token)
                toast.success("Login Successfully")
                this.setIsLoading(false)

                window.location.replace("http://localhost:3000/")
            })
            .catch(() => {
                toast.error("Incorrect Username or Password")
                this.setIsLoading(false)
            })

    }

    setErrors = (errors: string[]) => {
        this.errors = errors
    }

    logout = async () => {
        localStorage.removeItem(StaticValues.userToken)
        this.setLoggedInUser(null)

        router.navigate('/')
    }

    register = async (registerInfo: RegisterInfo) => {
        this.setIsLoading(true)

        await axiosAgents.AccountActions.register(registerInfo)
            .then(() => {
                this.setErrors([])
                this.setIsLoading(false)
                toast.success("Register Successfully")
            })
            .catch((error) => {
                let errorArrays: any = [];

                if (error.response.data.errors) {
                    const errorValues: any = Object.values(error.response.data.errors)
                    errorArrays = errorArrays.concat(...errorValues);

                    this.setErrors(errorArrays)
                }
                else if (!error.response.data.errors && error.response.data) {
                    errorArrays[0] = error.response.data

                    this.setErrors(errorArrays)
                }

                this.setIsLoading(false)
            })
    }

    triggerUnauthorized = () => {
        axiosAgents.AccountActions.unauthorized();
    }
}

