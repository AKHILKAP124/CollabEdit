import { createBrowserRouter } from "react-router-dom";
import Editor from "../app/Editor/Page";
import SnippetsPage from "../app/snippet/Page";
import Snippet from "../app/snippet/snippetPage/Page";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Editor />,
  },
  {
    path: "/snippets",
    element: <SnippetsPage />,
  },
  {
    path: "/snippets/:id",
    element: <Snippet />,
  },
]);

export default AppRouter