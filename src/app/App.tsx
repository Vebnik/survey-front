import { Navigate, Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index/index";
import SurveyPage from "@/pages/survey";
import { useQuestion } from "@/store/question.store";

function GuardRouter({ children }: { children: JSX.Element }) {
  const que = useQuestion();

  return que.success ? children : <Navigate to={"/"} />;
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
