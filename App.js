import React from "react";
import { AppRegistry } from "react-native";
import { NativeRouter, Redirect, Route } from "react-router-native";

import AuthLayout from "./layouts/AuthLayout";
import UserLayout from "./layouts/UserLayout";

export default function App() {

  return (
    <NativeRouter>
      <Route path="/auth" component={AuthLayout} />
      <Route path="/user" component={UserLayout} />
      <Redirect from="/" to="/auth" />
    </NativeRouter>
  );
}

AppRegistry.registerComponent("MyApp", () => App);