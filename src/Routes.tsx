import { RouteObject, createBrowserRouter } from "react-router-dom";
import QueryRecommendations from "./Pages/QueryRecommendations";
import QueryFunction from "./Pages/QueryFunction";
import App from "./App";
import Login from "./Pages/Login";
import MainMenu from "./Pages/MainMenu";
import Signup from "./Pages/Signup";
import Unauthorized from "./Components/Unauthorized";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <MainMenu /> },
            { path: '/query/:query?', element: <QueryFunction /> },
            { path: '/recommend', element: <QueryRecommendations /> },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <Signup /> },
            { path: '/unauthorized', element: <Unauthorized /> }
        ]
    }
]

export const router = createBrowserRouter(routes)