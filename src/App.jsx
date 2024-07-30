
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";

import Support from "./components/Support";
import { useAuth } from "./context/AuthProvider";
import Courses from "./courses/Courses";
import Home from "./home/Home";

function App() {
  const [authUser] = useAuth();
  console.log(authUser);
  return (
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/support" element={<Support />} />
        </Routes>
        <Toaster />
      </div>
  );
}

export default App;
