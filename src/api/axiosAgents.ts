import axios, { AxiosResponse } from "axios";
import { SavedQuery } from "../models/SavedQuery";
import { LoginCredentials } from "../models/LoginCredentials";
import { RegisterInfo } from "../models/RegisterInfo"

axios.defaults.baseURL = 'https://localhost:44360/api'
axios.interceptors.response.use(async response => {
    try {
        return response
    }
    catch (error) {
        return await Promise.reject(error)
    }
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
    getAllSavedQueries: () => {
        return requests.get(`/Query`);
    },
    deleteSavedQuery: (queryToDeleteId: string) => {
        return requests.delete(`/Query/${queryToDeleteId}`);
    },
    updateSavedQuery: (queryToUpdateId: string, updateInfo: SavedQuery) => {
        return requests.put(`/Query/${queryToUpdateId}`, updateInfo);
    },
    getOneSavedQuery: (queryId: string) => {
        return requests.get(`/Query/${queryId}`);
    }
}

const AccountActions = {
    login: (credentials: LoginCredentials) => {
        return requests.post(`/Account/login`, credentials)
    },
    register: (registerInfo: RegisterInfo) => {
        return requests.post(`/Account/register`, registerInfo)
    }
}

const axiosAgents = { QueryActions, AccountActions }

export default axiosAgents