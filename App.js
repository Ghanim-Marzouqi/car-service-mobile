import React from "react";
import { AppRegistry } from "react-native";
import { NativeRouter, Redirect, Route } from "react-router-native";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { name as appName } from './app.json';
import AuthLayout from "./layouts/AuthLayout";
import UserLayout from "./layouts/UserLayout";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007bff',
    accent: '#f1c40f',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NativeRouter>
        <Route path="/auth" component={AuthLayout} />
        <Route path="/user" component={UserLayout} />
        <Redirect from="/" to="/auth" />
      </NativeRouter>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);