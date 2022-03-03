import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar.component"
import ItemsList from "./components/items-list.component";
import EditItem from "./components/edit-item.component";
import CreateItem from "./components/create-item.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={ItemsList} />
      <Route path="/edit/:id" component={EditItem} />
      <Route path="/create" component={CreateItem} />
      <Route path="/user" component={CreateUser} />
      {/*<div><img className="walrusLogo" src="images/walruslogo.png" alt="" /></div>*/}
    </Router>
  );
}

export default App;
