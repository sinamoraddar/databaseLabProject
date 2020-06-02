import React from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import TablePage from "./pages/TablePage/TablePage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/:table" component={TablePage} exact />
        <Route path="/courses/student/:ID" component={TablePage} exact />
        <Route path="/courses/instructor/:ID" component={TablePage} exact />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
