import "./App.css";
import Dashboard from "./components/Dashboard";
import MiddleSidebar from "./components/MiddleSidebar";
import Sidebar from "./components/Sidebar";
// import UserChat from "./components/UserChat";

function App() {
  return (
    <div className="w-screen flex font-mono ">
      <Sidebar />
      <MiddleSidebar />
      <Dashboard />
      {/* <UserChat /> */}
    </div>
  );
}

export default App;
