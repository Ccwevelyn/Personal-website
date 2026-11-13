import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ExperiencePage } from "./pages/ExperiencePage";
import { HomePage } from "./pages/HomePage";
import { InteractPage } from "./pages/InteractPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ResearchPage } from "./pages/ResearchPage";
import { WritingPage } from "./pages/WritingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "portfolio", element: <PortfolioPage /> },
      { path: "experience", element: <ExperiencePage /> },
      { path: "research", element: <ResearchPage /> },
      { path: "writing", element: <WritingPage /> },
      { path: "atelier", element: <InteractPage /> },
    ],
  },
]);
