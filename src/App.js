import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"; // react-router-dom version 5
import 'bootstrap/dist/css/bootstrap.min.css';

// importing components
import Navbar from "./components/navbar.component"
import ItemsList from "./components/items-list.component";
import EditItem from "./components/edit-item.component";
import CreateItem from "./components/create-item.component";
import CreateUser from "./components/create-user.component";

// displaying routers
function App() {
  return (
    <Router>
      <div className="container color-wishlist"> {/*bootstrap container class helps format components better*/}
        <Navbar />
        <br />
        <Route path="/" exact component={ItemsList} />
        <Route path="/edit/:id" component={EditItem} />
        <Route path="/create" component={CreateItem} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
