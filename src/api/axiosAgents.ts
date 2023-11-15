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
    delete: (url: string) => {
        return axios.delete(url).then(responseBody)
    }
}

const QueryActions = {
    queryResults: (queryString: string) => {
        return requests.get(`/Query/executeQuery/${queryString}`);
    },
    saveQuery: (queryToSave: any) => {
        return requests.post(`/Query`, queryToSave);
    },
    getAllSavedQuery: () => {
        return requests.get(`/Query`);
    },
    deleteSavedQuery: (queryId: string) => {
        return requests.delete(`/Query/${queryId}`);
    }
}

// const responseBody = (response: AxiosResponse) => response.data

// const requests = {
//     get: (url: string) => axios.get(url).then(responseBody),
//     post: (url: string, body: {}) => axios.post(url, body).then(responseBody),

// }

// const QueryActions = {
//     queryResults: (queryString: string) => requests.get(`/Query/${queryString}`),
//     saveQuery: (queryToSave: any) => requests.post(`/Query`, queryToSave),
//     getAllSavedQuery: () => requests.get(`/Query`)
// }

const axiosAgents = { QueryActions }

export default axiosAgents