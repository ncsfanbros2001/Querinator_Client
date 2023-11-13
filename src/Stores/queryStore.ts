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

    setQueryResult = (value: QueryResult) => {
        this.queryResult = value
    }

    setQueryRecommendations = (savedQueries: SavedQuery[]) => {
        const queryToPush: SavedQuery[] = []
        savedQueries.forEach((item) => queryToPush.push(item))

        this.savedQueries = queryToPush
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

    delay = () => {
        return new Promise(resolve => setTimeout(resolve, 1000));
    };

    executeQuery = async (queryString: string) => {
        this.setIsLoading(true)

        if (queryString.toLowerCase().includes("select")) {
            this.setTableHidden(false)
        }
        else {
            this.setTableHidden(true)
        }

        await axiosAgents.QueryActions.queryResults(queryString)
            .then(response => {
                this.setQueryResult(this.parseToJSON(response))

                if (queryString.toLowerCase().includes('select')) {
                    this.setColumnNames(
                        [...Object.keys(response?.result[0])]
                    )
                    this.setTableHidden(false)
                }
                else {
                    this.setTableHidden(true)
                }
            })
            .catch(error => {
                this.setQueryResult(this.parseToJSON(error?.response?.data))
            })

        await this.setEntireResultHidden(false)
        await this.delay()
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
        await this.delay()
        this.setIsLoading(false)
    }

    loadSavedQuery = async () => {
        this.setIsLoading(true)

        await axiosAgents.QueryActions.getAllSavedQuery()
            .then((response: any) => {
                this.setQueryRecommendations(response?.result)
            })
            .catch(() => {
                toast.error("Load query recommendations failed")
            })

        this.setIsLoading(false)
    }
}