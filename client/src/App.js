import React from "react";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import { Switch, Route, Redirect } from "react-router-dom";
import UserData from "./Pages/UserData";
import Login from "./Pages/Login";
import DisplayProducts from "./Pages/DisplayProducts";
import { auth1 } from "./Auth/Auth";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          {auth1.getLogin() ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route exact path="/dashboard">
          {auth1.getLogin() ? <Dashboard /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/view-user">
          {auth1.getLogin() ? <UserData /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/view-products">
          {auth1.getLogin() ? (
            <DisplayProducts />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
      </Switch>
    </>
  );
}


export default App;
