import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Dashboard from "./pages/Dashboard";
import ATSAnalysis from "./pages/ATSAnalysis";
import SavedJobs from "./pages/SavedJobs";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

        <Route
  path="/ats-analysis"
  element={
    <ProtectedRoute>
      <ATSAnalysis />
    </ProtectedRoute>
  }
/>
        <Route
  path="/saved-jobs"
  element={
    <ProtectedRoute>
      <SavedJobs />
    </ProtectedRoute>
  }
/>
        <Route
  path="/applications"
  element={
    <ProtectedRoute>
      <Applications />
    </ProtectedRoute>
  }
/>
       <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
        <Route
          path="/recruiter/dashboard"
          element={<RecruiterDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;