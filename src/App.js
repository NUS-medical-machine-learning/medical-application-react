import AnalysisConsole from "./components/analysisConsoleComponents/analysisConsole";
import SignInScreen from "./components/signIn";
import ErrorPage from "./components/errorPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import { COMPOUND_DETECTION_ROOT_URL } from "./apiCalls/common";
import useSocket from "./helpers/Hooks/useSocket";

function App() {
  console.log("App.js called");

  const [compoundDetectionSocket] = useSocket(COMPOUND_DETECTION_ROOT_URL);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <AnalysisConsole
                compoundDetectionSocket={compoundDetectionSocket}
              />
            }
          />
        </Route>
        <Route path="/login" element={<SignInScreen />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
