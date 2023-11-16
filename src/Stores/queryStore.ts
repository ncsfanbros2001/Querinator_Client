import { makeAutoObservable } from "mobx";
import axiosAgents from "../api/axiosAgents";
import { toast } from "react-toastify";
import { SavedQuery } from "../models/SavedQuery";
import { QueryResult } from "../models/QueryResult";

export default class QueryStore {
    queryResult: QueryResult | undefined = undefined;
    isLoading: boolean = false;
    columnNames: string[] = [];
    tableHidden: boolean = false;
    savedQueries: SavedQuery[] = [];
    entireResultHidden: boolean = false;
    singleSavedQuery: SavedQuery | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    private setEntireResultHidden = (value: boolean) => {
        this.entireResultHidden = value
    }

    private setIsLoading = (value: boolean) => {
        this.isLoading = value
    }

    private setTableHidden = (value: boolean) => {
        this.tableHidden = value
    }

    private setQueryResult = (value: QueryResult) => {
        this.queryResult = value
    }

    private setQueryRecommendations = (savedQueries: SavedQuery[]) => {
        const queryToPush: SavedQuery[] = []
        savedQueries.forEach((item) => queryToPush.push(item))

        this.savedQueries = queryToPush
    }

    private setSingleSavedQuery = (savedQuery: SavedQuery) => {
        this.singleSavedQuery = savedQuery
    }

    private setColumnNames = (value: string[]) => {
        this.columnNames = value
    }

    private parseToJSON = (value: any) => {
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

    executeQuery = async (queryString: string) => {
        this.setIsLoading(true)

        await axiosAgents.QueryActions.queryResults(queryString)
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
                toast.error(error?.response?.data?.errorMessages[0])
            })

        await this.setTableHidden(true)
        await this.setEntireResultHidden(true)
        this.setIsLoading(false)
    }

    loadAllSavedQueries = async () => {
        this.setIsLoading(true)

        await axiosAgents.QueryActions.getAllSavedQueries()
            .then((response) => {
                this.setQueryRecommendations(response?.result)
            })
            .catch((error) => {
                toast.error(error?.response?.data?.errorMessages[0])
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
                toast.error(error?.response?.data?.errorMessages[0])
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
                toast.error(error?.response?.data?.errorMessages[0])
            })
        this.setIsLoading(false)
    }

    loadOneSavedQuery = async (queryId: string) => {
        this.setIsLoading(true)
        await axiosAgents.QueryActions.getOneSavedQuery(queryId)
            .then((response) => {
                this.setSingleSavedQuery(response?.result)
            })
            .catch((error) => {
                toast.error(error?.response?.data?.errorMessages[0])
            })
        this.setIsLoading(false)
    }
}