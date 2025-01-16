import { Navigate, Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index/index";
import SurveyPage from "@/pages/survey";

function GuardRouter({ children }: { children: JSX.Element }) {
  return localStorage.getItem("isAgreement") === "true" ? (
    children
  ) : (
    <Navigate to={"/"} />
  );
}

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route
        element={
          <GuardRouter>
            <SurveyPage />
          </GuardRouter>
        }
        path="/survey"
      />
    </Routes>
  );
}

export default App;
