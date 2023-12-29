import { makeAutoObservable } from "mobx";
import axiosAgents from "../api/axiosAgents";
import { toast } from "react-toastify";
import { SavedQuery } from "../models/SavedQuery";
import { QueryResult } from "../models/QueryResult";
import { QueryHistory } from "../models/QueryHistory";

export default class QueryStore {
    queryResult: QueryResult | undefined = undefined;
    savedQueries: SavedQuery[] = [];
    columnNames: string[] = [];
    singleSavedQuery: SavedQuery | null = null;
    queryHistory: QueryHistory[] = [];

    isQueryLoading: boolean = false;
    tableHidden: boolean = false;
    entireResultHidden: boolean = false;


    constructor() {
        makeAutoObservable(this)
    }

    setEntireResultHidden = (value: boolean) => {
        this.entireResultHidden = value
    }

    setIsLoading = (value: boolean) => {
        this.isQueryLoading = value
    }

    setTableHidden = (value: boolean) => {
        this.tableHidden = value
    }

    setQueryResult = (value: QueryResult | undefined) => {
        this.queryResult = value
    }

    setSavedQueries = (savedQueries: SavedQuery[]) => {
        const queryToPush: SavedQuery[] = []
        savedQueries.forEach((item) => queryToPush.push(item))

        this.savedQueries = queryToPush
    }

    setSingleSavedQuery = (savedQuery: SavedQuery) => {
        this.singleSavedQuery = savedQuery
    }

    setColumnNames = (value: string[]) => {
        this.columnNames = value
    }

    setQueryHistory = (value: QueryHistory[]) => {
        this.queryHistory = value
    }

    unloadSingleSavedQuery = () => {
        this.singleSavedQuery = null
    }

    executeQuery = async (queryHistory: QueryHistory) => {
        this.setIsLoading(true)

        await axiosAgents.QueryActions.queryResults(queryHistory)
            .then(response => {
                this.setQueryResult(response)

                if (queryHistory.query.toLowerCase().includes('select') && response?.result?.length > 0) {
                    this.setColumnNames(
                        [...Object.keys(response?.result[0])]
                    )
                    this.setTableHidden(false)
                }
                else if (queryHistory.query.toLowerCase().includes('select') === false) {
                    this.setTableHidden(true)
                }
            })
            .catch(error => {
                this.setQueryResult(error?.response?.data)
            })

        this.setEntireResultHidden(false)
        this.setIsLoading(false)
    }

    saveQuery = async (queryToSave: any) => {
        this.setIsLoading(true)
        await axiosAgents.QueryActions.saveQuery(queryToSave)
            .then(() => {
                toast.success("Query saved successfully")
            })
            .catch(error => {
                if (error?.response?.data) {
                    toast.error(error?.response?.data?.errorMessage)
                }
            })

        await this.setTableHidden(true)
        await this.setEntireResultHidden(true)
        this.setIsLoading(false)
    }

    loadSavedQueries = async (userId: string) => {
        this.setIsLoading(true)

        await axiosAgents.QueryActions.getSavedQueries(userId)
            .then((response) => {
                this.setSavedQueries(response?.result)
            })
            .catch((error) => {
                if (error?.response?.data) {
                    toast.error(error?.response?.data?.errorMessage)
                }
            })

        this.setIsLoading(false)
    }

    updateSavedQuery = async (queryId: string, newUpdatedQuery: SavedQuery, userId: string) => {
        this.setIsLoading(true)
        await axiosAgents.QueryActions.updateSavedQuery(queryId, newUpdatedQuery)
            .then(() => {
                this.loadSavedQueries(userId)
                toast.success("Update query successfully")
            })
            .catch((error) => {
                if (error?.response?.data) {
                    toast.error(error?.response?.data?.errorMessage)
                }
            })
        this.setIsLoading(false)
    }

    deleteSavedQuery = async (queryId: string, userId: string) => {
        this.setIsLoading(true)
        await axiosAgents.QueryActions.deleteSavedQuery(queryId)
            .then(() => {
                this.loadSavedQueries(userId)
                toast.success("Deleted successfully")
            })
            .catch((error) => {
                if (error?.response?.data) {
                    toast.error(error?.response?.data?.errorMessage)
                }
            })
        this.setIsLoading(false)
    }

    loadOneSavedQuery = async (queryId: string) => {
        await axiosAgents.QueryActions.getOneSavedQuery(queryId)
            .then((response) => {
                this.setSingleSavedQuery(response?.result)
            })
            .catch((error) => {
                if (error?.response?.data) {
                    toast.error(error?.response?.data?.errorMessage)
                }
            })
    }

    getQueryHistory = async (userId: string) => {
        this.setIsLoading(true)
        await axiosAgents.QueryActions.getQueryHistory(userId)
            .then((response) => {
                this.setQueryHistory(response?.result)
            })
            .catch(error => {
                if (error?.response?.data) {
                    toast.error(error?.response?.data?.errorMessage)
                }
            })

        this.setIsLoading(false)
    }
}