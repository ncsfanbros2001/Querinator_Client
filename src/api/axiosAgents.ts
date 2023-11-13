import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'https://localhost:44360/api'
axios.interceptors.response.use(async response => {
    try {
        return response
    }
    catch (error) {
        return await Promise.reject(error)
    }
})

const responseBody = (response: AxiosResponse) => response.data

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody)
}

const QueryActions = {
    queryResults: (queryString: string) => requests.get(`/Query/${queryString}`),
    saveQuery: (queryToSave: any) => requests.post(`/Query`, queryToSave),
    getAllSavedQuery: () => requests.get(`/Query`)
}

const axiosAgents = { QueryActions }

export default axiosAgents