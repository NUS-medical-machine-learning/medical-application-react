import AnalysisConsole from "./components/analysisConsoleComponents/analysisConsole";
import SignInScreen from "./components/signIn";
import ErrorPage from "./components/errorPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<AnalysisConsole />} />
        </Route>
        <Route path="/login" element={<SignInScreen />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
