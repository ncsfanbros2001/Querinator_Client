import { createContext, useContext } from "react";
import QueryStore from "./queryStore";
import AccountStore from "./accountStore";
import ConnectionStore from "./connectionStore";

interface Store {
    queryStore: QueryStore
    accountStore: AccountStore
    connectionStore: ConnectionStore
}

export const store: Store = {
    queryStore: new QueryStore(),
    accountStore: new AccountStore(),
    connectionStore: new ConnectionStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}