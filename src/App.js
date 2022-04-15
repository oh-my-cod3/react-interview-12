import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import PeopleTable from './components/PeopleTable';
import PeopleTableFull from './components/PeopleTableFull';

function App() {
  return (
    <div className="App">
      <Router>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          
          <div className="collapse" id="">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/normal">Normal</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/full">Full</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div>
          <Routes>
            <Route path="/normal" element={<PeopleTable/>} />
            <Route path="/full" element={<PeopleTableFull/>} />

            <Route path="/" element={<h1>OK</h1>} />
          </Routes>
        </div>
      </Router>

 
    </div>
  );
}

export default App;
