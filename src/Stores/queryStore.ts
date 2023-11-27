import { makeAutoObservable, runInAction } from "mobx";
import axiosAgents from "../api/axiosAgents";
import { toast } from "react-toastify";
import { SavedQuery } from "../models/SavedQuery";
import { QueryResult } from "../models/QueryResult";

export default class QueryStore {
    queryResult: QueryResult | undefined = undefined;
    savedQueries: SavedQuery[] = [];
    columnNames: string[] = [];
    singleSavedQuery: SavedQuery | null = null;
    tableNames: string[] = [];

    isLoading: boolean = false;
    tableHidden: boolean = false;
    entireResultHidden: boolean = false;


    constructor() {
        makeAutoObservable(this)
    }

    setEntireResultHidden = (value: boolean) => {
        this.entireResultHidden = value
    }

    setIsLoading = (value: boolean) => {
        this.isLoading = value
    }

    setTableHidden = (value: boolean) => {
        this.tableHidden = value
    }

    setQueryResult = (value: QueryResult | undefined) => {
        this.queryResult = value
    }

    setQueryRecommendations = (savedQueries: SavedQuery[]) => {
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

    parseToJSON = (value: any) => {
        if (value !== undefined) {
            let jsonValue = JSON.parse(JSON.stringify(value))
            return jsonValue
        }
        else {
            return undefined
        }
    }

    unloadSingleSavedQuery = () => {
        this.singleSavedQuery = null
    }

    executeQuery = async (queryString: string, userRole: string) => {
        this.setIsLoading(true)

        await axiosAgents.QueryActions.queryResults(queryString, userRole)
            .then(response => {
                this.setQueryResult(this.parseToJSON(response))

                if (queryString.toLowerCase().includes('select') && response?.result?.length > 0) {
                    this.setColumnNames(
                        [...Object.keys(response?.result[0])]
                    )
                    this.setTableHidden(false)
                }
                else if (queryString.toLowerCase().includes('select') === false) {
                    this.setTableHidden(true)
                }
            })
            .catch(error => {
                this.setQueryResult(this.parseToJSON(error?.response?.data))
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
                    toast.error(error?.response?.data?.errorMessages[0])
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
                this.setQueryRecommendations(response?.result)
            })
            .catch((error) => {
                if (error?.response?.data) {
                    toast.error(error?.response?.data?.errorMessages[0])
                }
            })

        this.setIsLoading(false)
    }

    updateSavedQuery = async (queryId: string, newUpdatedQuery: SavedQuery) => {
        this.setIsLoading(true)
        await axiosAgents.QueryActions.updateSavedQuery(queryId, newUpdatedQuery)
            .then(() => {
                toast.success("Update query successfully")
            })
            .catch((error) => {
                if (error?.response?.data) {
                    toast.error(error?.response?.data?.errorMessages[0])
                }
            })
        this.setIsLoading(false)
    }

    deleteSavedQuery = async (queryId: string) => {
        this.setIsLoading(true)
        await axiosAgents.QueryActions.deleteSavedQuery(queryId)
            .then(() => {
                toast.success("Deleted successfully")
            })
            .catch((error) => {
                if (error?.response?.data) {
                    toast.error(error?.response?.data?.errorMessages[0])
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
                    toast.error(error?.response?.data?.errorMessages[0])
                }
            })
    }

    loadAllTableName = async () => {
        this.setIsLoading(true)

        await axiosAgents.QueryActions.getAllTableName()
            .then((response) => {
                runInAction(() => {
                    this.tableNames = response?.result
                })
            })
            .catch((error) => {
                if (error?.response?.data) {
                    toast.error(error?.response?.data?.errorMessages[0])
                }
            })

        this.setIsLoading(false)
    }
}