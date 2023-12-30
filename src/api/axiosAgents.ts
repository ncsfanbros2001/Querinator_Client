import axios, { AxiosError, AxiosResponse } from "axios";
import { LoginDTO } from "../DTOs/LoginDTO";
import { RegisterDTO } from "../DTOs/RegisterDTO"
import { store } from '../Stores/store'
import { ChangePasswordDTO } from "../DTOs/ChangePasswordDTO";
import { SetConnectionDTO } from "../DTOs/SetConnectionDTO";
import { QueryHistory } from "../models/QueryHistory";
import { SaveQueryDTO } from "../DTOs/SaveQueryDTO";
import { UpdateQueryDTO } from "../DTOs/UpdateQueryDTO";

axios.defaults.baseURL = 'https://localhost:5100/api'

axios.interceptors.request.use((config) => {
    const token = store.accountStore.userToken

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

axios.interceptors.response.use(async response => {
    return response;
}, (error: AxiosError) => {
    const { status } = error.response as AxiosResponse

    switch (status) {
        case 401:
            window.location.replace("/unauthorized")
            break
        case 403:
            window.location.replace("/unauthorized")
            break
    }

    return Promise.reject(error)
})

const responseBody = (response: AxiosResponse) => {
    return response.data;
}

const requests = {
    get: (url: string) => {
        return axios.get(url).then(responseBody);
    },
    getWithBody: (url: string, body: {}) => {
        return axios.get(url, body).then(responseBody);
    },
    post: (url: string, body: {}) => {
        return axios.post(url, body).then(responseBody);
    },
    put: (url: string, body: {}) => {
        return axios.put(url, body).then(responseBody);
    },
    delete: (url: string) => {
        return axios.delete(url).then(responseBody)
    }
}

const QueryActions = {
    queryResults: (queryHistory: QueryHistory) => {
        return requests.post(`/Query/executeQuery`, queryHistory);
    },
    saveQuery: (queryToSave: SaveQueryDTO) => {
        return requests.post(`/Query`, queryToSave);
    },
    getSavedQueries: (userId: string) => {
        return requests.get(`/Query/getByUserId/${userId}`);
    },
    deleteSavedQuery: (queryToDeleteId: string) => {
        return requests.delete(`/Query/${queryToDeleteId}`);
    },
    updateSavedQuery: (queryToUpdateId: string, updateInfo: UpdateQueryDTO) => {
        return requests.put(`/Query/${queryToUpdateId}`, updateInfo);
    },
    getOneSavedQuery: (queryId: string) => {
        return requests.get(`/Query/${queryId}`);
    },
    getQueryHistory: (userId: string) => {
        return requests.get(`/Query/history/${userId}`);
    }
}

const AccountActions = {
    login: (credentials: LoginDTO) => {
        return requests.post(`/Account/login`, credentials)
    },
    register: (registerInfo: RegisterDTO) => {
        return requests.post(`/Account/register`, registerInfo)
    },
    unauthorized: () => {
        return requests.get(`/Account/unauthorized`)
    },
    lockAndUnlock: (userId: string) => {
        return requests.get(`Account/lockUnlock/${userId}`)
    },
    getUsers: () => {
        return requests.get(`Account/getUsers`)
    },
    changePassword: (changePasswordInfo: ChangePasswordDTO) => {
        return requests.put(`Account/changePassword`, changePasswordInfo)
    }
}

const ConnectionActions = {
    retrieveDatabases: (server: string) => {
        return requests.get(`/Connection/databases/${encodeURIComponent(server)}`)
    },
    retrieveServers: () => {
        return requests.get('/Connection/servers')
    },
    setDbConnection: (connectionInfo: SetConnectionDTO) => {
        return requests.post(`/Connection/setConnection`, connectionInfo)
    },
    retrieveCurrentServerAndDb: (userId: string) => {
        return requests.get(`/Connection/serverAndDb/${userId}`)
    }
}

const axiosAgents = { QueryActions, AccountActions, ConnectionActions }

export default axiosAgents