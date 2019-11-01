import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Books from "./pages/Books";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
    <div>
      <Nav />
      <Route exact path="/" component={Books} />
      <Route exact path="/saved" component={Saved} />
{/*       <Route exact path="/books/:id" component={Detail} />
 */}    </div>
    </Router>
  );
}

export default App;
