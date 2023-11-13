import { RouteObject, createBrowserRouter } from "react-router-dom";
import MainMenu from "./Pages/MainMenu";
import QueryRecommendations from "./Pages/QueryRecommendations";
import QueryFunction from "./Pages/QueryFunction";
import App from "./App";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/query/:query?', element: <QueryFunction /> },
            { path: '/recommend', element: <QueryRecommendations /> },
        ]
    }
]

export const router = createBrowserRouter(routes)