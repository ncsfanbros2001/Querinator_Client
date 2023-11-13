import { createContext, useContext } from "react";
import QueryStore from "./queryStore";

interface Store {
    queryStore: QueryStore
}

export const store: Store = {
    queryStore: new QueryStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}