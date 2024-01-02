import { autorun, makeAutoObservable } from "mobx";
import { LoginDTO } from "../DTOs/LoginDTO";
import axiosAgents from "../api/axiosAgents";
import { toast } from "react-toastify";
import { User } from "../models/User";
import { StaticValues } from "../utilities/Statics";
import { RegisterDTO } from "../DTOs/RegisterDTO";
import { jwtDecode } from "jwt-decode";
import { LoginResult } from "../models/LoginResult";
import { ChangePasswordDTO } from "../DTOs/ChangePasswordDTO";

export default class AccountStore {
    isAccountLoading: boolean = false;
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
        this.isAccountLoading = value;
    }

    setLoggedInUser = (value: any) => {
        this.loggedInUser = value;
    }

    setUserList = (value: User[]) => {
        this.userList = value;
    }

    setErrors = (errors: string[]) => {
        this.errors = errors
    }

    login = async (loginCredentials: LoginDTO) => {
        this.setIsLoading(true)

        localStorage.removeItem(StaticValues.userToken)

        await axiosAgents.AccountActions.login(loginCredentials)
            .then((response: LoginResult) => {
                localStorage.setItem(StaticValues.userToken, response?.token)
                this.loggedInUser = jwtDecode(response?.token)
                this.setIsLoading(false)

                axiosAgents.ConnectionActions.retrieveCurrentServerAndDb(this.loggedInUser!.id)
                    .then((response) => {
                        if (response.result.serverName === null || response.result.databaseName === null) {
                            window.location.replace("/databaseConnection")
                        }
                        else {
                            window.location.replace("/")
                        }
                    })
            })
            .catch((error) => {
                toast.error(error?.response?.data)

                this.setIsLoading(false)
            })

    }

    logout = async () => {
        await localStorage.removeItem(StaticValues.userToken)
        await this.setLoggedInUser(null)

        window.location.replace("/")
    }

    register = async (registerInfo: RegisterDTO) => {
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

    changeUserPassword = async (changePasswordInfo: ChangePasswordDTO) => {
        this.setIsLoading(true)
        this.setErrors([])

        await axiosAgents.AccountActions.changePassword(changePasswordInfo)
            .then(() => {
                this.setErrors([])
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

    isTokenExpired = () => {
        if (this.userToken) {
            const expirationTime = this.loggedInUser?.expireDate;

            const currentTime = Math.floor(Date.now() / 1000);

            if (currentTime > expirationTime) {
                this.logout()
            }
        }
    }
}

