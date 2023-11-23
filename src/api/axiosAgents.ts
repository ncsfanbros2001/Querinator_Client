import axios, { AxiosError, AxiosResponse } from "axios";
import { SavedQuery } from "../models/SavedQuery";
import { LoginCredentials } from "../models/LoginCredentials";
import { RegisterInfo } from "../models/registerInfo"
import { store } from '../Stores/store'

axios.defaults.baseURL = 'https://localhost:44360/api'

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
            window.location.replace("http://localhost:3000/unauthorized")
            break
        case 403:
            window.location.replace("http://localhost:3000/unauthorized")
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
    queryResults: (queryString: string) => {
        return requests.get(`/Query/executeQuery/${queryString}`);
    },
    saveQuery: (queryToSave: SavedQuery) => {
        return requests.post(`/Query`, queryToSave);
    },
    getSavedQueries: (userId: string) => {
        return requests.get(`/Query/getByUserId/${userId}`);
    },
    deleteSavedQuery: (queryToDeleteId: string) => {
        return requests.delete(`/Query/${queryToDeleteId}`);
    },
    updateSavedQuery: (queryToUpdateId: string, updateInfo: SavedQuery) => {
        return requests.put(`/Query/${queryToUpdateId}`, updateInfo);
    },
    getOneSavedQuery: (queryId: string) => {
        return requests.get(`/Query/${queryId}`);
    },
    getAllTableName: () => {
        return requests.get('/Query/tableName')
    }
}

const AccountActions = {
    login: (credentials: LoginCredentials) => {
        return requests.post(`/Account/login`, credentials)
    },
    register: (registerInfo: RegisterInfo) => {
        return requests.post(`/Account/register`, registerInfo)
    },
    unauthorized: () => {
        return requests.get(`/Account/unauthorized`)
    }
}

const ConnectionActions = {
    getDbConnection: () => {
        return requests.get('/Connection')
    }
}

const axiosAgents = { QueryActions, AccountActions, ConnectionActions }

export default axiosAgents