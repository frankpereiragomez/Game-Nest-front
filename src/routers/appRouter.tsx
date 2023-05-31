import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../components/App/App";
import { Suspense } from "react";
import path from "./path/paths";
import LazyLoginPage from "./path/LazyLoginPage";

const routes: RouteObject[] = [
  {
    path: path.app,
    element: <App />,
    children: [
      {
        path: path.login,
        element: (
          <Suspense>
            <LazyLoginPage />
          </Suspense>
        ),
      },
    ],
  },
];

const appRouter = createBrowserRouter(routes);

export default appRouter;
