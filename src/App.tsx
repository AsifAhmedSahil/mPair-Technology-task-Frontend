import ProtectedRoute from "./components/Layout/ProtectedRoute";
import "./index.css";
import DahsboardLayout from "./pages/DahsboardLayout/DahsboardLayout";

const App = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <ProtectedRoute>
        <DahsboardLayout />
      </ProtectedRoute>
    </div>
  );
};

export default App;
