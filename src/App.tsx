import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout";
import Rank from "./page/Rank";
import Tasks from "./page/Tasks";
import Boosts from "./page/Boosts";

function App() {
  return (
    <Router>
      <div
        className="App h-screen flex flex-col max-sm:w-full sm:w-[500px] mx-auto justify-between overflow-hidden overflow-y-hidden relative"
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="rank" element={<Rank />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="boosts" element={<Boosts />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
