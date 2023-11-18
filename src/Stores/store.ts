import { createContext, useContext } from "react";
import QueryStore from "./queryStore";
import AccountStore from "./accountStore";

interface Store {
    queryStore: QueryStore
    accountStore: AccountStore
}

export const store: Store = {
    queryStore: new QueryStore(),
    accountStore: new AccountStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}