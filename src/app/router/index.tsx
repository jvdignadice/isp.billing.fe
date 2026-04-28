import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "@/pages/dashboard/dashboard-page";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
]);

