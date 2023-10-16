import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";
import ListUser from "./components/ListUser";
import ListClient from "./components/ListClient";
import CreateClient from "./components/CreateClient";
import CreateBid from "./components/CreateBid";
import ListBid from "./components/ListBid";
import EditClient from "./components/EditClient";

function App() {
  return (
    <div className="App">
      <h5>React CRUD operations using PHP API and MySQL</h5>

      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/ListUser">List Freelancer</Link>
            </li>
            <li>
              <Link to="/create">Create User</Link>
            </li>
            <li>
              <Link to="/client">Client</Link>
            </li>
            <li>
              <Link to="/create-client">Create Client</Link>
            </li>
            <li>
              <Link to="/create-bid">Create Bid</Link>
            </li>
            <li>
              <Link to="/bid">List Bid</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {["/ListUser", "/"].map((path, index) => (
            <Route path={path} element={<ListUser />} key={index} />
          ))}
          <Route path="/create" element={<CreateUser />} />
          <Route path="/client" element={<ListClient />} />
          <Route path="/create-client" element={<CreateClient />} />
          <Route path="/user/:Freelancer_ID/edit" element={<EditUser />} />
          <Route path="/create-bid" element={<CreateBid />} />
          <Route path="/bid" element={<ListBid />} />
          <Route path="/client-edit/:client_id" element={<EditClient />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
