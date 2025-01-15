import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index/index";
import SurveyPage from "@/pages/survey";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<SurveyPage />} path="/survey" />
    </Routes>
  );
}

export default App;
