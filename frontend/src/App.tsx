import "./App.css";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="w-screen flex font-mono ">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
