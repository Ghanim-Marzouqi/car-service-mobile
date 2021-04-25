import React from "react";
import { Redirect, Route, Switch } from "react-router-native";

import Login from "../pages/Login";
import Registration from "../pages/Registration";

export default function AuthLayout() {
  return (
    <Switch>
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Registration} />
      <Redirect from="/auth" to="/auth/login" />
    </Switch>
  );
}
