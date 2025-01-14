import "./App.css";
import Dashboard from "./components/Dashboard";
import MiddleSidebar from "./components/MiddleSidebar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="w-screen flex font-mono ">
      <Sidebar />
      <MiddleSidebar />
      <Dashboard />
    </div>
  );
}

export default App;
