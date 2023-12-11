import { autorun, makeAutoObservable, reaction } from "mobx";
import { LoginCredentials } from "../models/LoginCredentials";
import axiosAgents from "../api/axiosAgents";
import { toast } from "react-toastify";
import { User } from "../models/User";
import { StaticValues } from "../utilities/Statics";
import { RegisterInfo } from "../models/registerInfo";
import { jwtDecode } from "jwt-decode";
import { LoginResult } from "../models/LoginResult";
import { router } from "../Routes";
import { ChangePasswordInfo } from "../models/ChangePasswordInfo";

export default class AccountStore {
    isLoading: boolean = false;
    userToken: string | null = localStorage.getItem(StaticValues.userToken)
    loggedInUser: User | null = null
    errors: string[] = []
    userList: User[] = []

    constructor() {
        makeAutoObservable(this)

        autorun(() => {
            if (this.userToken !== null) {
                this.loggedInUser = jwtDecode(this.userToken)
            }
        })
    }

    setIsLoading = (value: boolean) => {
        this.isLoading = value;
    }

    setLoggedInUser = (value: User | null) => {
        this.loggedInUser = value;
    }

    setUserList = (value: User[]) => {
        this.userList = value;
    }

    login = async (loginCredentials: LoginCredentials) => {
        this.setIsLoading(true)

        localStorage.removeItem(StaticValues.userToken)

        await axiosAgents.AccountActions.login(loginCredentials)
            .then((response: LoginResult) => {
                localStorage.setItem(StaticValues.userToken, response?.token)
                this.setIsLoading(false)

                window.location.replace("/")
            })
            .catch((error) => {
                toast.error(error?.response?.data)

                this.setIsLoading(false)
            })

    }

    setErrors = (errors: string[]) => {
        this.errors = errors
    }

    logout = async () => {
        await localStorage.removeItem(StaticValues.userToken)
        await this.setLoggedInUser(null)

        router.navigate('/')
    }

    register = async (registerInfo: RegisterInfo) => {
        this.setIsLoading(true)
        this.setErrors([])

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

    lockAndUnlock = async (userId: string) => {
        await axiosAgents.AccountActions.lockAndUnlock(userId)
            .then(() => {
                this.getAllUsers()
                toast.success("Success")
            })
            .catch(() => {
                toast.error("Failed")
            })
    }

    getAllUsers = async () => {
        this.setIsLoading(true)

        await axiosAgents.AccountActions.getUsers()
            .then((response) => {
                this.setUserList(response)
            })
            .catch(() => {
                toast.error("Can't load users")
            })

        this.setIsLoading(false)
    }

    changeUserPassword = async (changePasswordInfo: ChangePasswordInfo) => {
        this.setIsLoading(true)
        this.setErrors([])

        await axiosAgents.AccountActions.changePassword(changePasswordInfo)
            .then(() => {
                this.setErrors([])
                this.setIsLoading(false)

                this.setIsLoading(false)
                toast.success("Change Password Successfully")
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

